import { Repository } from 'typeorm';
import { RegistroImovel } from '../entities/imovel';
import { AppDataSource } from '../data-source';

const ImovelRepository: Repository<RegistroImovel> = AppDataSource.getRepository(RegistroImovel);

export const cadastrarImovel = async (data: RegistroImovel): Promise<void> => {
  await ImovelRepository.save(data);
};

export const obterTodosImoveis = async (): Promise<RegistroImovel[]> => {
  return ImovelRepository.find();
};
