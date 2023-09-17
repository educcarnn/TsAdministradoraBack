import { Repository } from "typeorm";
import { Empresa } from "../../entities/empresa";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entities/pessoaFisica";

export const EmpresaRepository: Repository<Empresa> =
  AppDataSource.getRepository(Empresa);
export const PessoaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);

export const adicionarPessoaAEmpresa = async (
  empresaId: number,
  pessoaData: Partial<Pessoa>
): Promise<Pessoa> => {
  const empresa = await EmpresaRepository.findOne(empresaId);
  if (!empresa) throw new Error("Empresa não encontrada.");

  const novaPessoa = PessoaRepository.create(pessoaData);
  novaPessoa.empresa = empresa;

  return await PessoaRepository.save(novaPessoa);
};

export const removerPessoaDaEmpresa = async (
  empresaId: number,
  pessoaId: number
): Promise<void> => {
  const empresa = await EmpresaRepository.findOne(empresaId, {
    relations: ["pessoas"],
  });
  if (!empresa) throw new Error("Empresa não encontrada.");

  const pessoaIndex = empresa.pessoas.findIndex((p) => p.id === pessoaId);
  if (pessoaIndex < 0) throw new Error("Pessoa não encontrada na empresa.");

  await PessoaRepository.delete(pessoaId);
};
