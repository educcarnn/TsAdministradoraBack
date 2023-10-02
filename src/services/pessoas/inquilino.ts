import { Repository } from "typeorm";
import { Inquilino } from "../../entities/pessoas/inquilino";
import { PessoaIntermediaria } from "../../entities/pessoas/pessoa";
import { RegistroImovel } from "../../entities/imovel/imovel";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entities/pessoaFisica";
import { PessoaJuridica } from "../../entities/pessoaJuridica";

const InquilinoRepository: Repository<Inquilino> =
  AppDataSource.getRepository(Inquilino);
const pessoaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);
  const pessoaJuridicaRepository: Repository<PessoaJuridica> =
  AppDataSource.getRepository(PessoaJuridica);
const RegistroImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);

  export const cadastrarInquilino = async (
    inquilinosData: {
      id: number;
      percentual: number;
      tipo: "Física" | "Jurídica";
    }[],
    imovelId: number,
    status: string
  ): Promise<Inquilino[]> => {
    const imovel = await RegistroImovelRepository.findOne({
      where: { id: imovelId },
    });
  
    if (!imovel) {
      throw new Error(`Imóvel com ID ${imovelId} não encontrado`);
    }
  
    const novosInquilinos: Inquilino[] = [];
  
    for (const inquilinoData of inquilinosData) {
      let pessoa: Pessoa | PessoaJuridica | null;
  
      if (inquilinoData.tipo === "Física") {
        pessoa = await pessoaRepository.findOne({
          where: { id: inquilinoData.id },
        });
      } else if (inquilinoData.tipo === "Jurídica") {
        pessoa = await pessoaJuridicaRepository.findOne({
          where: { id: inquilinoData.id },
        });
      } else {
        throw new Error("Tipo de pessoa inválido");
      }
  
      if (!pessoa) {
        throw new Error(`Pessoa com ID ${inquilinoData.id} não encontrada`);
      }
  
      const newInquilino = new Inquilino();
      newInquilino.registroImovel = imovel;
      newInquilino.status = status;
  
      if (pessoa instanceof Pessoa) {
        newInquilino.pessoa = pessoa;
      } else if (pessoa instanceof PessoaJuridica) {
        newInquilino.pessoaJuridica = pessoa;
      } else {
        throw new Error("Tipo de pessoa inválido");
      }
  
      const savedInquilino = await InquilinoRepository.save(newInquilino);
      novosInquilinos.push(savedInquilino);
    }
  
    return novosInquilinos;
  };

export const obterInquilinoPorId = async (
  id: number
): Promise<Inquilino | undefined> => {
  return (
    (await InquilinoRepository.findOne({
      where: { id: id },
      relations: ["pessoaIntermediaria", "registroImovel"],
    })) || undefined
  );
};

export const atualizarInquilino = async (
  id: number,
  inquilinoData: Partial<Inquilino>
): Promise<Inquilino> => {
  const inquilinoExistente = await InquilinoRepository.findOne({
    where: { id: id },
  });

  if (!inquilinoExistente) {
    throw new Error(`Inquilino com ID ${id} não encontrado`);
  }

  InquilinoRepository.merge(inquilinoExistente, inquilinoData);
  return await InquilinoRepository.save(inquilinoExistente);
};

export const excluirInquilino = async (inquilinoId: number): Promise<void> => {
  // Encontre o inquilino pelo ID
  const inquilino = await InquilinoRepository.findOne({
    where: { id: inquilinoId },
  });
  if (!inquilino) {
    throw new Error(`Inquilino com ID ${inquilinoId} não encontrado`);
  }

  // Exclua o inquilino
  await InquilinoRepository.remove(inquilino);
};

// Listar todos os Inquilinos
export const listarInquilinos = async (): Promise<Inquilino[]> => {
  return await InquilinoRepository.find({
    relations: ["pessoaIntermediaria", "registroImovel"],
  });
};
