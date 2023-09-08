import { Repository } from 'typeorm';
import { Pessoa } from '../entities/pessoaFisica';
import { AppDataSource } from '../data-source';
import bcrypt from "bcrypt";
import { isEmailInUse } from '../utils/emailUtils';
import { userRepository } from './user';
export const PessoaRepository: Repository<Pessoa> = AppDataSource.getRepository(Pessoa);


export const cadastrarPessoa = async (pessoaData: Partial<Pessoa>): Promise<Pessoa> => {
  if (!pessoaData.email) {
      throw new Error("E-mail não fornecido.");
  }

  const emailInUse = await isEmailInUse(pessoaData.email);
  if (emailInUse) {
      throw new Error("E-mail já registrado em User ou Pessoa.");
  }

  if (!pessoaData.password) {
      throw new Error("Senha não fornecida.");
  }

  pessoaData.password = await hashPassword(pessoaData.password);

  const novaPessoa = PessoaRepository.create(pessoaData);

  await PessoaRepository.save(novaPessoa);
  
  return novaPessoa;
};

export const requeryPessoas = async () => {
  const requery = await PessoaRepository.find({
    relations: {
      imoveisRelacionados: true,
      contratosProprietarios: true,
      contratosInquilinos: true,
    },
  });
  return requery;
};

export const findPessoaByEmail = async (email: string): Promise<Pessoa | null> => {
  const userWithEmail = await userRepository.findOne({ where: { email: email } });

  if (userWithEmail) {
      // Se o e-mail estiver registrado na tabela de User, retornamos null
      return null;
  }

  return await PessoaRepository.findOne({ where: { email: email } });
};
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const checkPassword = async (inputPassword: string, storedPasswordHash: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, storedPasswordHash);
};

export const obterTodasPessoas = async (): Promise<Pessoa[]> => {
  return PessoaRepository.find();
};

export const obterPessoaPorId = async (id: number): Promise<Pessoa | undefined> => {
  try {
    const getPessoa = await requeryPessoas();
    const pessoa = await PessoaRepository.findOne({ where: { id: id } });

    if (pessoa) {
      // Procura a pessoa nas informações carregadas
      const pessoaFind = getPessoa.find(item => item.id === pessoa.id);

      if (pessoaFind) {
        return pessoaFind;
      }
    }

    return undefined;
  } catch (error) {
    console.error('Erro ao obter Pessoa por ID:', error);
    return undefined;
  }
}


export const deletarPessoaPorId = async (id: number): Promise<void> => {
  await PessoaRepository.delete(id);
};

export const atualizarPessoaPorId = async (id: number, data: Pessoa): Promise<void> => {
  await PessoaRepository.update(id, data);
};