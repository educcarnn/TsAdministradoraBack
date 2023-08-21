import { Repository } from 'typeorm';
import { Contrato } from '../entities/contrato';
import { AppDataSource } from '../data-source'; // Certifique-se de importar o dataSource correto
import { PessoaRepository } from './pessoaFisica';
const ContratoRepository: Repository<Contrato> = AppDataSource.getRepository(Contrato);

export const cadastrarContrato = async (data: Contrato, pessoaId: number): Promise<void> => {
  const contratoRepository = AppDataSource.getRepository(Contrato);

  const pessoa = await PessoaRepository.findOne({
    where: { id: pessoaId },
    relations: ['contratos'], // Carrega a relação de contratos da pessoa
  });

  if (!pessoa) {
    throw new Error("Pessoa não encontrada");
  }

  const contrato = contratoRepository.create(data);
  contrato.pessoa = pessoa; // Associe a pessoa ao contrato

  await contratoRepository.save(contrato);

  // Atualize a relação de contratos da pessoa
  pessoa.contratos.push(contrato);

  await PessoaRepository.save(pessoa);
};

export const obterTodosContratos = async (): Promise<Contrato[]> => {
  return ContratoRepository.find();
};

export const obterContratoPorId = async (id: number): Promise<Contrato | undefined> => {
  const contrato = await ContratoRepository.findOne({ where: { id: id } });
  return contrato || undefined;
};

export const deletarContratoPorId = async (id: number): Promise<void> => {
  await ContratoRepository.delete(id);
};

export const atualizarContratoPorId = async (id: number, data: Contrato): Promise<void> => {
  await ContratoRepository.update(id, data);
};
