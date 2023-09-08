import { Repository } from "typeorm";
import { Contrato } from "../entities/contrato";
import { AppDataSource } from "../data-source"; // Certifique-se de importar o dataSource correto
import { PessoaRepository } from "./pessoaFisica";
import { RegistroImovel } from "../entities/imovel";
const ContratoRepository: Repository<Contrato> =
  AppDataSource.getRepository(Contrato);
const ImovelRepository: Repository<RegistroImovel> = AppDataSource.getRepository(RegistroImovel)

export const cadastrarContrato = async (
  data: Contrato,
  inquilinoId: number,
  proprietarioId: number,
  imovelId: number
): Promise<Contrato> => {
  const contratoRepository = AppDataSource.getRepository(Contrato);

  const inquilino = await PessoaRepository.findOne({
    where: { id: inquilinoId },
  });

  if (!inquilino) {
    throw new Error("Inquilino (locatário) não encontrado");
  }

  const proprietario = await PessoaRepository.findOne({
    where: { id: proprietarioId },
  });

  if (!proprietario) {
    throw new Error("Proprietário não encontrado");
  }

  const imovel = await ImovelRepository.findOne({
    where: { id: imovelId },
  });

  if (!imovel) {
    throw new Error("Imóvel não encontrado");
  }

  const contrato = contratoRepository.create(data);
  contrato.inquilino = inquilino;   // Associe o inquilino ao contrato
  contrato.proprietario = proprietario;  // Associe o proprietário ao contrato
  contrato.imovel = imovel;  // Associe o imóvel ao contrato

  await contratoRepository.save(contrato);

  // Como as relações são `ManyToOne`, você não precisa atualizar os arrays de contratos dos objetos `inquilino` e `proprietario`
  // O TypeORM se encarregará de atualizar os IDs estrangeiros no contrato

  return contrato;
};

export const getContratos = async () => {
  const imoveisComPessoas = await ContratoRepository.find({
    relations: {
      inquilino: true,
      imovel: true,
      proprietario: true,
    },
  });
  return imoveisComPessoas;
};

export const obterTodosContratos = async (): Promise<Contrato[]> => {
  return ContratoRepository.find();
};

export const obterContratoPorId = async (id: number): Promise<Contrato | undefined> => {
  try {
    const getContrato = await getContratos();
    const contrato = await ContratoRepository.findOne({ where: { id: id } });

    if (contrato) {
      // Procura o imóvel nas informações carregadas
      const contratoFind = getContrato.find(item => item.id === contrato.id);

      if (contratoFind) {
        return contratoFind;
      }
    }

    return undefined;
  } catch (error) {
    console.error('Erro ao obter Contrato por ID:', error);
    return undefined;
  }
}


export const deletarContratoPorId = async (id: number): Promise<void> => {
  await ContratoRepository.delete(id);
};

export const atualizarContratoPorId = async (
  id: number,
  data: Contrato
): Promise<void> => {
  await ContratoRepository.update(id, data);
};
