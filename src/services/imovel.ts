import { Repository } from 'typeorm';
import { RegistroImovel } from '../entities/imovel';
import { Pessoa } from '../entities/pessoaFisica';
import { AppDataSource } from '../data-source';

const ImovelRepository: Repository<RegistroImovel> = AppDataSource.getRepository(RegistroImovel);
const PessoaRepository: Repository<Pessoa> = AppDataSource.getRepository(Pessoa); // Adicione o repositório da entidade Pessoa



export const cadastrarImovel = async (
  imovelData: RegistroImovel,
  pessoaId: number
): Promise<RegistroImovel> => {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const imovelRepository = AppDataSource.getRepository(RegistroImovel);

  // Encontre a pessoa pelo ID
  const pessoa = await pessoaRepository.findOne({
    where: { id: pessoaId },
  });

  if (!pessoa) {
    throw new Error("Pessoa não encontrada");
  }

  // Crie o imóvel com a associação à pessoa
  const imovel = imovelRepository.create(imovelData);
  imovel.proprietario = pessoa; // Associe a pessoa como proprietária do imóvel

  // Salve o imóvel no banco de dados
  await imovelRepository.save(imovel);

  return imovel;
};



export const obterTodosImoveis = async (): Promise<RegistroImovel[]> => {
  return ImovelRepository.find();
};

export const obterImovelPorId = async (
  id: number
): Promise<RegistroImovel | undefined> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });
  return imovel || undefined;
};

export const deletarImovelPorId = async (id: number): Promise<void> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });

  if (imovel) {
    await ImovelRepository.remove(imovel);
  }
};

export const atualizarImovelPorId = async (
  id: number,
  data: Partial<RegistroImovel>
): Promise<void> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });

  if (imovel) {
    Object.assign(imovel, data);
    await ImovelRepository.save(imovel);
  }
};
