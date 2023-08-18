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

