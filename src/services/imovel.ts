import { Repository } from "typeorm";
import { RegistroImovel } from "../entities/imovel";
import { Pessoa } from "../entities/pessoaFisica";
import { AppDataSource } from "../data-source";
import { ProprietarioImovel } from "../entities/relations/proprietarioImovel";

const ImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);
  AppDataSource.getRepository(Pessoa); // Adicione o repositório da entidade Pessoa

const pessoaRepository = AppDataSource.getRepository(Pessoa);
const imovelRepository = AppDataSource.getRepository(RegistroImovel);
const proprietarioImovelRepository = AppDataSource.getRepository(ProprietarioImovel);

export const cadastrarImovel = async (
  imovelData: RegistroImovel,
  proprietariosData: { id: number, percentual: number }[]
): Promise<RegistroImovel> => {



  // Salve o novo imóvel no banco de dados
  const savedImovel = await imovelRepository.save(imovelData);

  for (const propData of proprietariosData) {
    const pessoa = await pessoaRepository.findOne({ where: { id: propData.id } });
    if (!pessoa) {
      throw new Error(`Pessoa com ID ${propData.id} não encontrada`);
    }

    const proprietarioImovel = new ProprietarioImovel();
    proprietarioImovel.pessoa = pessoa;
    proprietarioImovel.registroImovel = savedImovel;
    proprietarioImovel.percentualPropriedade = propData.percentual;

    await proprietarioImovelRepository.save(proprietarioImovel);
  }

  return savedImovel;
};


export const getImoveisComPessoas = async () => {
  const imoveisComPessoas = await imovelRepository.find({
    relations: {
      imoveisProprietarios: true,
      contratos: true,
    },
  });
  return imoveisComPessoas;
};

export const obterTodosImoveis = async (): Promise<RegistroImovel[]> => {
  return ImovelRepository.find();
};

export const obterImovelPorId = async (
  id: number
): Promise<RegistroImovel | undefined> => {
  try {
    const imoveisComPessoas = await getImoveisComPessoas(); // Carrega informações de pessoas relacionadas aos imóveis
    const imovel = await ImovelRepository.findOne({ where: { id: id } });

    if (imovel) {
      // Procura o imóvel nas informações carregadas
      const imovelEncontrado = imoveisComPessoas.find(item => item.id === imovel.id);

      if (imovelEncontrado) {
        return imovelEncontrado;
      }
    }

    return undefined;
  } catch (error) {
    console.error('Erro ao obter Imóvel por ID:', error);
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