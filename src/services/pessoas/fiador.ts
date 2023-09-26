import { Repository } from "typeorm";
import { Fiador } from "../../entities/pessoas/fiador";
import { Pessoa } from "../../entities/pessoaFisica";
import { RegistroImovel } from "../../entities/imovel/imovel";
import { AppDataSource } from "../../data-source";

const FiadorRepository: Repository<Fiador> =
  AppDataSource.getRepository(Fiador);
const PessoaFisicaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);
const RegistroImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);

export const cadastrarFiador = async (
  pessoaId: number,
  imovelId: number,
  numeroMatriculaRGI: string
): Promise<Fiador> => {
  const pessoa = await PessoaFisicaRepository.findOne({
    where: { id: pessoaId },
  });
  if (!pessoa) {
    throw new Error(`Pessoa com ID ${pessoaId} não encontrada`);
  }

  const imovel = await RegistroImovelRepository.findOne({
    where: { id: imovelId },
  });
  if (!imovel) {
    throw new Error(`Imóvel com ID ${imovelId} não encontrado`);
  }

  const newFiador = new Fiador();
  newFiador.pessoa = pessoa;
  newFiador.imovelComoFianca = imovel;
  newFiador.numeroMatriculaRGI = numeroMatriculaRGI; // Defina o número de matrícula de RGI

  return await FiadorRepository.save(newFiador);
};

// Obter Fiador por ID
export const obterFiadorPorId = async (
  id: number
): Promise<Fiador | undefined> => {
  return (
    (await FiadorRepository.findOne({
      where: { id: id },
      relations: ["pessoa", "imovelComoFianca"],
    })) || undefined
  );
};

export const atualizarFiador = async (
  id: number,
  fiadorData: Partial<Fiador>
): Promise<Fiador> => {
  const fiadorExistente = await FiadorRepository.findOne({ where: { id: id } });

  if (!fiadorExistente) {
    throw new Error(`Fiador com ID ${id} não encontrado`);
  }

  FiadorRepository.merge(fiadorExistente, fiadorData);
  return await FiadorRepository.save(fiadorExistente);
};



export const excluirContratoDeFiador = async (fiadorId: number): Promise<void> => {
  // Encontre o fiador pelo ID
  const fiador = await FiadorRepository.findOne({ where: { id: fiadorId } });
  if (!fiador) {
    throw new Error(`Fiador com ID ${fiadorId} não encontrado`);
  }

  // Exclua o fiador
  await FiadorRepository.remove(fiador);
};
// Listar todos os Fiadores
export const listarFiadores = async (): Promise<Fiador[]> => {
  return await FiadorRepository.find({
    relations: ["pessoa", "endereco", "imovelComoFianca"],
  });
};
