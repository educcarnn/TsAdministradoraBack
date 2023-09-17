import { Repository } from "typeorm";
import { Empresa } from "../../entities/empresa";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entities/pessoaFisica";

export const EmpresaRepository: Repository<Empresa> =
  AppDataSource.getRepository(Empresa);
export const PessoaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);

export const criarEmpresa = async (
  empresaData: Partial<Empresa>
): Promise<Empresa> => {
  const novaEmpresa = EmpresaRepository.create(empresaData);
  return await EmpresaRepository.save(novaEmpresa);
};

export const obterTodasEmpresas = async (): Promise<Empresa[]> => {
  return EmpresaRepository.find();
};

export const obterEmpresaPorId = async (
  id: number
): Promise<Empresa | undefined> => {
  const empresa = await EmpresaRepository.findOne({ where: { id }, relations: ["pessoas"] });
  return empresa || undefined;
};



export const atualizarEmpresaPorId = async (
  id: number,
  data: Partial<Empresa>
): Promise<void> => {
  const empresa = await EmpresaRepository.findOne({ where: { id } });
  if (!empresa) throw new Error("Empresa não encontrada.");

  await EmpresaRepository.update(id, data);
};


export const deletarEmpresaPorId = async (id: number): Promise<void> => {
  const empresa = await EmpresaRepository.findOne({ where: { id }, relations: ["pessoas"] });
  if (!empresa) throw new Error("Empresa não encontrada.");

  for (let pessoa of empresa.pessoas) {
    await PessoaRepository.delete(pessoa.id);
  }

  await EmpresaRepository.delete(id);
};
