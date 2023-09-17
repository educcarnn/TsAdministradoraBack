import { Repository } from 'typeorm';
import { PessoaFisica } from '../entities/pessoaFisica';
import { AppDataSource } from '../data-source';
import bcrypt from "bcrypt";
import { isEmailInUse } from '../utils/emailUtils';
import { userRepository } from './user';
import { PessoaIntermediaria } from '../entities/pessoas/pessoa';
export const PessoaIntermediariaRepository: Repository<PessoaIntermediaria> = AppDataSource.getRepository(PessoaIntermediaria)
export const PessoaRepository: Repository<PessoaFisica> = AppDataSource.getRepository(PessoaFisica);

export const cadastrarPessoa = async (pessoaData: Partial<PessoaFisica>): Promise<PessoaFisica> => {
  if (!pessoaData.dadosComuns || !pessoaData.dadosComuns.email) {
      throw new Error("E-mail não fornecido.");
  }

  const emailInUse = await isEmailInUse(pessoaData.dadosComuns.email);
  if (emailInUse) {
      throw new Error("E-mail já registrado em User ou Pessoa.");
  }

  if (!pessoaData.dadosComuns.password) {
      throw new Error("Senha não fornecida.");
  }

  pessoaData.dadosComuns.password = await hashPassword(pessoaData.dadosComuns.password);

  // Primeiro, salvamos a entidade intermediária
  const dadosComunsCriados = await PessoaIntermediariaRepository.save(pessoaData.dadosComuns);

  // Em seguida, associamos a entidade intermediária à entidade Pessoa
  pessoaData.dadosComuns = dadosComunsCriados;

  const novaPessoa = PessoaRepository.create(pessoaData);

  await PessoaRepository.save(novaPessoa);

  return novaPessoa;
};


export const requeryPessoas = async () => {
  const queryBuilder = PessoaRepository
    .createQueryBuilder('pessoa')
    .leftJoinAndSelect('pessoa.imoveisRelacionados', 'proprietarioImovel')
    .leftJoinAndSelect('proprietarioImovel.registroImovel', 'registroImovel')
    .addSelect(['registroImovel.caracteristicas']) // Seleciona as características do imóvel

  const result = await queryBuilder.getMany();

  return result;
};
export const findPessoaByEmail = async (email: string): Promise<PessoaFisica | null> => {
  const userWithEmail = await userRepository.findOne({ where: { email: email } });

  if (userWithEmail) {

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

export const obterTodasPessoas = async (): Promise<PessoaFisica[]> => {
  return PessoaRepository.find();
};

export const obterPessoaPorId = async (id: number): Promise<PessoaFisica | undefined> => {
  try {
    const getPessoa = await requeryPessoas();
    const pessoa = await PessoaRepository.findOne({ where: { id: id } });

    if (pessoa) {

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

export const atualizarPessoaPorId = async (id: number, data: PessoaFisica): Promise<void> => {
  await PessoaRepository.update(id, data);
};