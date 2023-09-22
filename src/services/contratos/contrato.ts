import { Repository } from "typeorm";
import { Contrato } from "../../entities/contratos/contrato";
import { AppDataSource } from "../../data-source"; // Certifique-se de importar o dataSource correto
import { PessoaRepository } from "../pessoas/pessoaFisica";
import { RegistroImovel } from "../../entities/imovel/imovel";
import { ContratoInquilino } from "../../entities/relations/contratoInquilino";
import { ContratoProprietario } from "../../entities/relations/contratoProprietario";

const ContratoRepository: Repository<Contrato> =
  AppDataSource.getRepository(Contrato);
const ImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);

export const cadastrarContrato = async (
  data: Contrato,
  inquilinos: { id: number; percentual: number }[],
  proprietarios: { id: number; percentual: number }[],
  imovelId: number
): Promise<Contrato> => {
  const contratoRepository = AppDataSource.getRepository(Contrato);
  const contratoInquilinoRepository =
    AppDataSource.getRepository(ContratoInquilino);
  const contratoProprietarioRepository =
    AppDataSource.getRepository(ContratoProprietario);

  const imovel = await ImovelRepository.findOne({
    where: { id: imovelId },
  });

  if (!imovel) {
    throw new Error("Imóvel não encontrado");
  }

  const contrato = contratoRepository.create(data);
  contrato.imovel = imovel;

  await contratoRepository.save(contrato);

  for (const inquilinoData of inquilinos) {
    const inquilino = await PessoaRepository.findOne({
      where: { id: inquilinoData.id },
    });

    if (!inquilino) {
      throw new Error(
        `Inquilino (locatário) com ID ${inquilinoData.id} não encontrado`
      );
    }

    const contratoInquilino = contratoInquilinoRepository.create({
      percentual: inquilinoData.percentual,
      contrato: contrato,
      inquilino: inquilino,
    });

    await contratoInquilinoRepository.save(contratoInquilino);
  }

  for (const proprietarioData of proprietarios) {
    const proprietario = await PessoaRepository.findOne({
      where: { id: proprietarioData.id },
    });

    if (!proprietario) {
      throw new Error(
        `Proprietário com ID ${proprietarioData.id} não encontrado`
      );
    }

    const contratoProprietario = contratoProprietarioRepository.create({
      percentual: proprietarioData.percentual,
      contrato: contrato,
      proprietario: proprietario,
    });

    await contratoProprietarioRepository.save(contratoProprietario);
  }

  return contrato;
};

export const getContratos = async () => {
  const contratos = await ContratoRepository.createQueryBuilder("contrato")
    .select([
      "contrato.id",
      "contrato.tipoContrato",
      "contrato.garantia",
      "contrato.detalhesContrato",
    ])

    // Relação com Inquilinos
    .leftJoin("contrato.inquilinoRelacoes", "inquilinoRelacao")
    .addSelect("inquilinoRelacao.percentual") // Adicionando o percentual do inquilino
    .leftJoin("inquilinoRelacao.inquilino", "inquilino")
    .addSelect(["inquilino.id", "inquilino.nome"]) // Selecionando apenas ID e Nome do inquilino

    // Relação com Proprietários
    .leftJoin("contrato.proprietarioRelacoes", "proprietarioRelacao")
    .addSelect("proprietarioRelacao.percentual") // Adicionando o percentual do proprietário
    .leftJoin("proprietarioRelacao.proprietario", "proprietario")
    .addSelect(["proprietario.id", "proprietario.nome"]) // Selecionando apenas ID e Nome do proprietário

    // Relação com o Imóvel
    .leftJoinAndSelect("contrato.imovel", "registroImovel")

    .getMany();

  return contratos;
};

export const obterTodosContratos = async (): Promise<Contrato[]> => {
  return ContratoRepository.find();
};

export const obterContratoPorId = async (
  id: number
): Promise<Contrato | undefined> => {
  try {
    const getContrato = await getContratos();
    const contrato = await ContratoRepository.findOne({ where: { id: id } });

    if (contrato) {
      // Procura o imóvel nas informações carregadas
      const contratoFind = getContrato.find((item) => item.id === contrato.id);

      if (contratoFind) {
        return contratoFind;
      }
    }

    return undefined;
  } catch (error) {
    console.error("Erro ao obter Contrato por ID:", error);
    return undefined;
  }
};

export const deletarContratoPorId = async (id: number): Promise<void> => {
  await ContratoRepository.delete(id);
};

export const atualizarContratoPorId = async (
  id: number,
  data: Contrato
): Promise<void> => {
  await ContratoRepository.update(id, data);
};
