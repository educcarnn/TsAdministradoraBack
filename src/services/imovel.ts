import { Repository } from 'typeorm';
import { RegistroImovel } from '../entities/imovel';
import { AppDataSource } from '../data-source';
import { PessoaRepository } from './pessoaFisica';

export const ImovelRepository: Repository<RegistroImovel> = AppDataSource.getRepository(RegistroImovel);

export const cadastrarImovel = async (data: RegistroImovel, pessoaId: number): Promise<void> => {
  const imovel = new RegistroImovel();
  const imovelSalvo = await ImovelRepository.save(imovel);

  const pessoa = await PessoaRepository.findOne({ where: { id: pessoaId } }); // Utiliza a opção "where" para buscar a pessoa por ID
  if (pessoa) {
    imovelSalvo.proprietarios.push(pessoa);
    await ImovelRepository.save(imovelSalvo);
  } else {
    throw new Error('Pessoa não encontrada');
  }
};
export const obterTodosImoveis = async (): Promise<RegistroImovel[]> => {
  return ImovelRepository.find();
};


export const obterImovelPorId = async (id: number): Promise<RegistroImovel | undefined> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });
  return imovel || undefined;
};

export const deletarImovelPorId = async (id: number): Promise<void> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });

  if (imovel) {
    await ImovelRepository.remove(imovel);
  }
};

export const atualizarImovelPorId = async (id: number, data: Partial<RegistroImovel>): Promise<void> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });

  if (imovel) {
    Object.assign(imovel, data);
    await ImovelRepository.save(imovel);
  }
};

