import { Repository } from "typeorm";
import { ProprietarioImovel } from "../../entities/relations/proprietarioImovel";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entities/pessoaFisica";
import { PessoaJuridica } from "../../entities/pessoaJuridica";
import { RegistroImovel } from "../../entities/imovel/imovel";

const ProprietarioImovelRepository: Repository<ProprietarioImovel> =
  AppDataSource.getRepository(ProprietarioImovel);
const pessoaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);
const pessoaJuridicaRepository: Repository<PessoaJuridica> =
  AppDataSource.getRepository(PessoaJuridica);
const RegistroImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);

  export const cadastrarProprietario = async (
    imovelId: number,
    proprietariosData: {
      id: number;
      percentual?: number;
      tipo: "Física" | "Jurídica";
    }[]
  ): Promise<ProprietarioImovel[]> => {
    const novosProprietarios: ProprietarioImovel[] = [];
  
    const registroImovel = await RegistroImovelRepository.findOne({
      where: { id: imovelId },
    });
  
    if (!registroImovel) {
      throw new Error(`Imóvel com ID ${imovelId} não encontrado`);
    }
  
    for (const proprietarioData of proprietariosData) {
      let pessoa: Pessoa | PessoaJuridica | null;
  
      if (proprietarioData.tipo === "Física") {
        pessoa = await pessoaRepository.findOne({
          where: { id: proprietarioData.id },
        });
      } else if (proprietarioData.tipo === "Jurídica") {
        pessoa = await pessoaJuridicaRepository.findOne({
          where: { id: proprietarioData.id },
        });
      } else {
        throw new Error("Tipo de pessoa inválido");
      }
  
      if (!pessoa) {
        throw new Error("Pessoa não encontrada");
      }
  
      const novoProprietario = new ProprietarioImovel();
      novoProprietario.registroImovel = registroImovel;
      novoProprietario.percentualPropriedade = proprietarioData.percentual || 0;
  
      if (pessoa instanceof Pessoa) {
        novoProprietario.pessoa = pessoa;
      } else if (pessoa instanceof PessoaJuridica) {
        novoProprietario.pessoaJuridica = pessoa;
      } else {
        throw new Error("Tipo de pessoa inválido");
      }
  
      const savedProprietario = await ProprietarioImovelRepository.save(
        novoProprietario
      );
      novosProprietarios.push(savedProprietario);
    }
  
    return novosProprietarios;
  };

export const obterProprietarioPorId = async (
  id: number
): Promise<ProprietarioImovel | undefined> => {
  return (
    (await ProprietarioImovelRepository.findOne({
      where: { id: id },
      relations: ["pessoa", "pessoaJuridica", "registroImovel"],
    })) || undefined
  );
};

export const atualizarProprietario = async (
  id: number,
  proprietarioData: Partial<ProprietarioImovel>
): Promise<ProprietarioImovel> => {
  const proprietarioExistente = await ProprietarioImovelRepository.findOne({
    where: { id: id },
  });

  if (!proprietarioExistente) {
    throw new Error(`Proprietário com ID ${id} não encontrado`);
  }

  ProprietarioImovelRepository.merge(proprietarioExistente, proprietarioData);
  return await ProprietarioImovelRepository.save(proprietarioExistente);
};

export const excluirProprietario = async (
  proprietarioId: number
): Promise<void> => {
  const proprietario = await ProprietarioImovelRepository.findOne({
    where: { id: proprietarioId },
  });
  if (!proprietario) {
    throw new Error(`Proprietário com ID ${proprietarioId} não encontrado`);
  }

  await ProprietarioImovelRepository.remove(proprietario);
};

export const listarProprietarios = async (): Promise<ProprietarioImovel[]> => {
  return await ProprietarioImovelRepository.find({
    relations: ["pessoa", "pessoaJuridica", "registroImovel"],
  });
};
