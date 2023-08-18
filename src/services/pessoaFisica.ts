import { Repository } from 'typeorm';
import { Pessoa } from '../entities/pessoaFisica';
import { AppDataSource } from '../data-source';

const PessoaRepository: Repository<Pessoa> = AppDataSource.getRepository(Pessoa);

export const cadastrarPessoa = async (data: Pessoa): Promise<void> => {
  await PessoaRepository.save(data);
};

export const obterTodasPessoas = async (): Promise<Pessoa[]> => {
  return PessoaRepository.find();
};

export const obterPessoaPorId = async (id: number): Promise<Pessoa | undefined> => {
  const pessoa = await PessoaRepository.findOne({ where: { id: id } });
  return pessoa || undefined;
};

export const deletarPessoaPorId = async (id: number): Promise<void> => {
  await PessoaRepository.delete(id);
};

export const atualizarPessoaPorId = async (id: number, data: Pessoa): Promise<void> => {
  await PessoaRepository.update(id, data);
};