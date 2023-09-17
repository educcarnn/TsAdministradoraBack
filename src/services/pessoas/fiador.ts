import { Repository } from "typeorm";
import { Fiador } from "../../entities/pessoas/fiador";
import { Pessoa } from "../../entities/pessoaFisica";
import { RegistroImovel } from "../../entities/imovel";
import { AppDataSource } from "../../data-source";

const FiadorRepository: Repository<Fiador> = AppDataSource.getRepository(Fiador);
const PessoaFisicaRepository: Repository<Pessoa> = AppDataSource.getRepository(PessoaFisica);
const RegistroImovelRepository: Repository<RegistroImovel> = AppDataSource.getRepository(RegistroImovel);

export const cadastrarFiador = async (
  fiadorData: Partial<Fiador>,
  pessoaFisicaId: number,
  enderecoId: number,
  imovelComoFiancaId: number
): Promise<Fiador> => {
  const pessoa = await PessoaFisicaRepository.findOne(Pessoa);
  if (!pessoa) {
    throw new Error(`Pessoa com ID ${pessoaFisicaId} não encontrada`);
  }

  const endereco = await RegistroImovelRepository.findOne(enderecoId);
  if (!endereco) {
    throw new Error(`Endereço com ID ${enderecoId} não encontrado`);
  }

  const imovelFianca = await RegistroImovelRepository.findOne(imovelComoFiancaId);
  if (!imovelFianca) {
    throw new Error(`Imóvel com ID ${imovelComoFiancaId} não encontrado`);
  }

  const fiador = new Fiador();
  fiador.pessoa = pessoa;
  fiador.endereco = endereco;
  fiador.imovelComoFianca = imovelFianca;
  // ... (preencha outros campos conforme necessário)
  
  return await FiadorRepository.save(fiador);
};

// Obter Fiador por ID
export const obterFiadorPorId = async (id: number): Promise<Fiador | undefined> => {
  return await FiadorRepository.findOne(id, { relations: ["pessoa", "endereco", "imovelComoFianca"] });
};

// Atualizar Fiador
export const atualizarFiador = async (id: number, fiadorData: Partial<Fiador>): Promise<Fiador> => {
  const fiadorExistente = await FiadorRepository.findOne(id);
  if (!fiadorExistente) {
    throw new Error(`Fiador com ID ${id} não encontrado`);
  }

  FiadorRepository.merge(fiadorExistente, fiadorData);
  return await FiadorRepository.save(fiadorExistente);
};

// Deletar Fiador
export const deletarFiador = async (id: number): Promise<void> => {
  const fiadorExistente = await FiadorRepository.findOne(id);
  if (!fiadorExistente) {
    throw new Error(`Fiador com ID ${id} não encontrado`);
  }

  await FiadorRepository.remove(fiadorExistente);
};

// Listar todos os Fiadores
export const listarFiadores = async (): Promise<Fiador[]> => {
  return await FiadorRepository.find({ relations: ["pessoa", "endereco", "imovelComoFianca"] });
};
