import { Repository } from "typeorm";
import { RegistroImovel } from "../entities/imovel";
import { Pessoa } from "../entities/pessoaFisica";
import { AppDataSource } from "../data-source";
import { ProprietarioImovel } from "../entities/relations/proprietarioImovel";
import { PessoaJuridica } from "../entities/pessoaJuridica";
const ImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);
AppDataSource.getRepository(Pessoa);

const pessoaRepository = AppDataSource.getRepository(Pessoa);
const imovelRepository = AppDataSource.getRepository(RegistroImovel);
const proprietarioImovelRepository =
  AppDataSource.getRepository(ProprietarioImovel);
  
const pessoaJuridicaRepository = AppDataSource.getRepository(PessoaJuridica)

export const cadastrarImovel = async (
  imovelData: RegistroImovel,
  proprietariosData: { id: number; percentual: number; tipo: "Física" | "Jurídica" }[]
): Promise<RegistroImovel> => {
  const savedImovel = await imovelRepository.save(imovelData);

  for (const propData of proprietariosData) {
    let proprietario: Pessoa | PessoaJuridica | null;

    if (propData.tipo === "Física") {
      proprietario = await pessoaRepository.findOne({ where: { id: propData.id } });
    } else {
      proprietario = await pessoaJuridicaRepository.findOne({ where: { id: propData.id } });
    }

    if (!proprietario) {
      throw new Error(`Proprietário com ID ${propData.id} não encontrado`);
    }

    const proprietarioImovel = new ProprietarioImovel();

    if (propData.tipo === "Física") {
      proprietarioImovel.pessoa = proprietario as Pessoa;
    } else {
      proprietarioImovel.pessoaJuridica = proprietario as PessoaJuridica;
    }

    proprietarioImovel.registroImovel = savedImovel;
    proprietarioImovel.percentualPropriedade = propData.percentual;

    await proprietarioImovelRepository.save(proprietarioImovel);
  }

  return savedImovel;
};

  
export const getImovelComProprietario = async (imovelId: number) => {
  const imovelComProprietario = await imovelRepository
    .createQueryBuilder("imovel")
    .where("imovel.id = :imovelId", { imovelId })
    .leftJoinAndSelect("imovel.imoveisProprietarios", "proprietarioImovel")

    // Busca por Pessoa Física
    .leftJoin("proprietarioImovel.pessoa", "pessoa")
    .addSelect(["pessoa.nome", "pessoa.id"])

    // Busca por Pessoa Jurídica
    .leftJoin("proprietarioImovel.pessoaJuridica", "pessoaJuridica")
    .addSelect(["pessoaJuridica.razaoSocial", "pessoaJuridica.id", "pessoaJuridica.cnpj"])

    .leftJoinAndSelect("imovel.contratos", "contrato")
    .getOne(); // Porque agora estamos procurando por um imóvel específico

  return imovelComProprietario;
};


export const getImoveisComPessoas = async () => {
  const imoveisComPessoas = await imovelRepository
    .createQueryBuilder("imovel")
    .leftJoinAndSelect("imovel.imoveisProprietarios", "proprietarioImovel")

    // Busca por Pessoa Física
    .leftJoin("proprietarioImovel.pessoa", "pessoa")
    .addSelect(["pessoa.nome", "pessoa.id"])

    // Busca por Pessoa Jurídica
    .leftJoin("proprietarioImovel.pessoaJuridica", "pessoaJuridica")
    .addSelect(["pessoaJuridica.razaoSocial", "pessoaJuridica.id", "pessoaJuridica.cnpj"])

    .leftJoinAndSelect("imovel.contratos", "contrato")
    .getMany();

  return imoveisComPessoas;
};


export const obterTodosImoveis = async (): Promise<RegistroImovel[]> => {
  return ImovelRepository.find();
};

export const obterImovelPorId = async (
  id: number
): Promise<RegistroImovel | undefined> => {
  try {
    const imoveisComPessoas = await getImoveisComPessoas(); 
    const imovel = await ImovelRepository.findOne({ where: { id: id } });

    if (imovel) {

      const imovelEncontrado = imoveisComPessoas.find(
        (item) => item.id === imovel.id
      );

      if (imovelEncontrado) {
        return imovelEncontrado;
      }
    }

    return undefined;
  } catch (error) {
    console.error("Erro ao obter Imóvel por ID:", error);
    return undefined;
  }
};

export const atualizarImovelPorId = async (
  id: number,
  data: Partial<RegistroImovel>
): Promise<void> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });

  if (imovel) {
    Object.assign(imovel, data);
    await ImovelRepository.save(imovel);
  }
};

export const deletarImovelPorId = async (id: number): Promise<void> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });

  if (imovel) {
    await ImovelRepository.remove(imovel);
  }
};
