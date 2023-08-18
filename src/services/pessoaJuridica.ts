import { Repository } from 'typeorm';
import { PessoaJuridica } from '../entities/pessoaJuridica';
import { AppDataSource } from '../data-source';

const PessoaJuridicaRepository: Repository<PessoaJuridica> = AppDataSource.getRepository(PessoaJuridica);

export const cadastrarPessoaJuridica = async (data: PessoaJuridica): Promise<void> => {
  await PessoaJuridicaRepository.save(data);
};

export const obterTodasPessoasJuridicas = async (): Promise<PessoaJuridica[]> => {
  return PessoaJuridicaRepository.find();
};
