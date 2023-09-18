import { Repository } from "typeorm";
import { Empresa } from "../../entities/empresa/empresa";
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

export const requeryEmpresas = async () => {
  const queryBuilder = EmpresaRepository.createQueryBuilder("empresa")
    .select(["empresa.id", "empresa.nome"])
    // Junta com a tabela Pessoa
    .leftJoinAndSelect("empresa.pessoas", "pessoa")
    .addSelect(["pessoa.id", "pessoa.nome"])
    // Junta com a tabela PessoaJuridica
    .leftJoinAndSelect("empresa.pessoaJuridicas", "pessoaJuridica")
    .addSelect(["pessoaJuridica.id", "pessoaJuridica.razaoSocial", "pessoaJuridica.nomeFantasia"])
    // Junta com a tabela User (administradores - agora será um array, não apenas uma entidade)
    .leftJoinAndSelect("empresa.administradores", "administrador")
    .addSelect(["administrador.id", "administrador.nome"]); // Suponho que o User tem um campo chamado "nome". Troque conforme a estrutura real de seu modelo User.

  const result = await queryBuilder.getMany();

  return result;
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
