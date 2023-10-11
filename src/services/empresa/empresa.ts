import { Repository } from "typeorm";
import { Empresa } from "../../entities/empresa/empresa";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entities/pessoaFisica";
import { User } from "../../entities/user";
import { isEmailInUse } from "../../utils/emailUtils";
import { hashPassword } from "../user/user";
export const EmpresaRepository: Repository<Empresa> =
  AppDataSource.getRepository(Empresa);
export const PessoaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);

export const UserRepository: Repository<User> =
  AppDataSource.getRepository(User);

export const criarEmpresa = async (empresaUsuarioData: {
  empresa: Partial<Empresa>;
  usuario: Partial<User>;
}): Promise<{ empresa: Empresa; usuario: User }> => {
  const { empresa, usuario } = empresaUsuarioData;

  if (!empresa.nome) {
    throw new Error("Nome da empresa não fornecido.");
  }

  if (!usuario.email) {
    throw new Error("E-mail não fornecido.");
  }

  const emailInUse = await isEmailInUse(usuario.email);
  if (emailInUse) {
    throw new Error("E-mail já registrado em User ou Pessoa.");
  }

  if (!usuario.password) {
    throw new Error("Senha não fornecida.");
  }

  const novaEmpresa = new Empresa();
  novaEmpresa.nome = empresa.nome;

  const novoUsuario = new User();
  novoUsuario.email = usuario.email;
  novoUsuario.empresa = novaEmpresa;
  novoUsuario.password = await hashPassword(usuario.password);

  await EmpresaRepository.save(novaEmpresa);
  await UserRepository.save(novoUsuario);

  return { empresa: novaEmpresa, usuario: novoUsuario };
};

export const requeryEmpresas = async () => {
  const queryBuilder = EmpresaRepository.createQueryBuilder("empresa")
    .select(["empresa.id", "empresa.nome"])
    .leftJoinAndSelect("empresa.pessoas", "pessoa")

    .leftJoinAndSelect("empresa.pessoaJuridicas", "pessoaJuridica")
    .addSelect([
      "pessoaJuridica.id",
      "pessoaJuridica.razaoSocial",
      "pessoaJuridica.nomeFantasia",
    ])

    .leftJoinAndSelect("empresa.administradores", "administrador");

  const result = await queryBuilder.getMany();

  return result;
};

export const requeryEmpresaPorId = async (empresaId: number) => {
  const queryBuilder = EmpresaRepository.createQueryBuilder("empresa")
    .select([
      "empresa.id",
      "empresa.nome",
      "empresa.telefone",
      "empresa.endereco",
    ])
    .leftJoinAndSelect("empresa.pessoas", "pessoa")

    .leftJoinAndSelect("empresa.pessoaJuridicas", "pessoaJuridica")
    .addSelect([
      "pessoaJuridica.id",
      "pessoaJuridica.razaoSocial",
      "pessoaJuridica.nomeFantasia",
    ])

    .leftJoinAndSelect("empresa.administradores", "administrador")
    .where("empresa.id = :empresaId", { empresaId });

  const result = await queryBuilder.getOne(); // Usamos getOne para buscar apenas uma empresa

  return result;
};

export const obterTodasEmpresas = async (): Promise<Empresa[]> => {
  return EmpresaRepository.find();
};

export const obterEmpresaPorId = async (
  id: number
): Promise<Empresa | undefined> => {
  const empresa = await EmpresaRepository.findOne({
    where: { id },
    relations: ["pessoas"],
  });
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
  const empresa = await EmpresaRepository.findOne({
    where: { id },
    relations: ["pessoas"],
  });
  if (!empresa) throw new Error("Empresa não encontrada.");

  for (let pessoa of empresa.pessoas) {
    await PessoaRepository.delete(pessoa.id);
  }

  await EmpresaRepository.delete(id);
};
