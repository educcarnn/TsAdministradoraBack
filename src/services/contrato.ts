import { Repository } from 'typeorm';
import { Contrato } from '../entities/contrato';
import { AppDataSource } from '../data-source'; // Certifique-se de importar o dataSource correto

const ContratoRepository: Repository<Contrato> = AppDataSource.getRepository(Contrato);

export const cadastrarContrato = async (data: Contrato): Promise<void> => {
  await ContratoRepository.save(data);
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
