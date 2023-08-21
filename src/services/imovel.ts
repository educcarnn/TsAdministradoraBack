import { Repository } from "typeorm";
import { RegistroImovel } from "../entities/imovel";
import { AppDataSource } from "../data-source";
import { PessoaRepository } from "./pessoaFisica";

const ImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);

export const cadastrarImovel = async (
  imovelData: RegistroImovel,
  pessoaId: number
): Promise<void> => {
  const imovel = ImovelRepository.create(imovelData);

  const pessoa = await PessoaRepository.findOne({ where: { id: pessoaId } });

  if (!pessoa) {
    throw new Error("Pessoa não encontrada");
  }

  // Associe o imóvel à pessoa
  imovel.proprietario = pessoa;

  // Salve o imóvel
  await ImovelRepository.save(imovel);
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
