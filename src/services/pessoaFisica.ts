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
  return PessoaRepository.findOne(id);
};