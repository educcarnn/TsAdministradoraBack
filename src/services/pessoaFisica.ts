import { Repository } from 'typeorm';
import { Pessoa } from '../entities/pessoaFisica';
import { AppDataSource } from '../data-source';
import bcrypt from "bcrypt";
import { isEmailInUse } from '../utils/emailUtils';
import { userRepository } from './user';
import { Contrato } from '../entities/contrato';

export const PessoaRepository: Repository<Pessoa> = AppDataSource.getRepository(Pessoa);
export const ContratoInquilino: Repository<Contrato> = AppDataSource.getRepository(Contrato)

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
    const pessoa = await PessoaRepository
      .createQueryBuilder("pessoa")
      .leftJoinAndSelect("pessoa.imoveisRelacionados", "proprietarioImovel")
      .leftJoinAndSelect("proprietarioImovel.registroImovel", "imovel") // Inclui informações do imóvel
      .leftJoinAndSelect("pessoa.contratosProprietarios", "contratoProprietario")
      .leftJoinAndSelect("pessoa.contratosInquilinos", "contratoInquilino")
      .where("pessoa.id = :id", { id: id })
      .getOne();

    // Inclui os contratos de proprietário e inquilino na pessoa
    if (pessoa) {
      pessoa.contratosProprietarios = await obterContratosPorProprietarioId(pessoa.id);
      pessoa.contratosInquilinos = await obterContratosPorInquilinoId(pessoa.id);
    }

    return pessoa || undefined;
  } catch (error) {
    console.error('Erro ao obter Pessoa por ID:', error);
    return undefined;
  }
}

// Função para obter contratos de proprietário por ID de pessoa
export const obterContratosPorProprietarioId = async (pessoaId: number): Promise<Contrato[]> => {
  try {
    const contratos = await ContratoRepository
      .createQueryBuilder("contrato")
      .leftJoin("contrato.proprietario", "proprietario")
      .where("proprietario.id = :pessoaId", { pessoaId: pessoaId })
      .getMany();

    return contratos || [];
  } catch (error) {
    console.error('Erro ao obter contratos de proprietário:', error);
    return [];
  }
}

// Função para obter contratos de inquilino por ID de pessoa
export const obterContratosPorInquilinoId = async (pessoaId: number): Promise<Contrato[]> => {
  try {
    const contratos = await ContratoRepository
      .createQueryBuilder("contrato")
      .leftJoin("contrato.inquilinos", "inquilino")
      .where("inquilino.id = :pessoaId", { pessoaId: pessoaId })
      .getMany();

    return contratos || [];
  } catch (error) {
    console.error('Erro ao obter contratos de inquilino:', error);
    return [];
  }
}

export const deletarPessoaPorId = async (id: number): Promise<void> => {
  await PessoaRepository.delete(id);
};

export const atualizarPessoaPorId = async (id: number, data: Pessoa): Promise<void> => {
  await PessoaRepository.update(id, data);
};