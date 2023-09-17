import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PessoaJuridica } from '../../entities/pessoaJuridica';
import { AppDataSource } from '../../data-source';

const PessoaJuridicaRepository: Repository<PessoaJuridica> = AppDataSource.getRepository(PessoaJuridica);

export const cadastrarPessoaJuridica = async (data: PessoaJuridica): Promise<void> => {
  await PessoaJuridicaRepository.save(data);
};

export const obterTodasPessoasJuridicas = async (): Promise<PessoaJuridica[]> => {
  return PessoaJuridicaRepository.find();
};

export const obterPessoaJuridicaPorId = async (id: number): Promise<PessoaJuridica | undefined> => {
  const pessoaJuridica = await PessoaJuridicaRepository.findOne({ where: { id: id } });
  return pessoaJuridica || undefined;
};

export const atualizarPessoaJuridicaPorId = async (id: number, data: PessoaJuridica): Promise<UpdateResult> => {
  return await PessoaJuridicaRepository.update(id, data);
};

export const deletarPessoaJuridicaPorId = async (id: number): Promise<DeleteResult> => {
  return await PessoaJuridicaRepository.delete(id);
};
