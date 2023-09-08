import { Repository } from "typeorm";
import { Contrato } from "../entities/contrato";
import { AppDataSource } from "../data-source"; // Certifique-se de importar o dataSource correto
import { PessoaRepository } from "./pessoaFisica";
import { RegistroImovel } from "../entities/imovel";
import { ContratoInquilino } from "../entities/relations/contratoInquilino";
const ContratoRepository: Repository<Contrato> =
  AppDataSource.getRepository(Contrato);
const ImovelRepository: Repository<RegistroImovel> = AppDataSource.getRepository(RegistroImovel)

export const cadastrarContrato = async (
  data: Contrato,
  inquilinosData?: { id: number, percentual: number }[],  
  proprietarioId?: number,  // Opcional
  imovelId?: number  // Opcional
): Promise<Contrato> => {
  const contratoRepository = AppDataSource.getRepository(Contrato);
  const contratoInquilinoRepository = AppDataSource.getRepository(ContratoInquilino);

  if (!inquilinosData || !Array.isArray(inquilinosData) || inquilinosData.length === 0) {
    throw new Error("Dados dos inquilinos inválidos ou não fornecidos");
  }

  if (!proprietarioId) {
    throw new Error("ID do proprietário não fornecido");
  }

  if (!imovelId) {
    throw new Error("ID do imóvel não fornecido");
  }

  const inquilinosIds = inquilinosData.map(i => i.id);
  const inquilinos = await PessoaRepository.findByIds(inquilinosIds);
  
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
  await contratoRepository.save(contrato);  // Salve o contrato primeiro para obter um ID

  for (const inquilinoData of inquilinosData) {
    const inquilino = inquilinos.find(i => i.id === inquilinoData.id);

    if (!inquilino) {
        throw new Error(`Inquilino com ID ${inquilinoData.id} não encontrado.`);
    }

    const contratoInquilino = contratoInquilinoRepository.create({
        inquilino: inquilino,  
        contrato: contrato,
        percentual: inquilinoData.percentual
    });

    await contratoInquilinoRepository.save(contratoInquilino);
  }

  contrato.proprietario = proprietario;
  contrato.imovel = imovel;

  return contrato;
};



export const getContratos = async () => {
  const imoveisComPessoas = await ContratoRepository.find({
    relations: {
      inquilinos: true,
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
