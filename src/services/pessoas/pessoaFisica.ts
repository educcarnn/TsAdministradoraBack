import { Repository } from "typeorm";
import { Pessoa } from "../../entities/pessoaFisica";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { isEmailInUse } from "../../utils/emailUtils";
import { PessoaIntermediaria } from "../../entities/pessoas/pessoa";


export const PessoaIntermediariaRepository: Repository<PessoaIntermediaria> =
  AppDataSource.getRepository(PessoaIntermediaria);
export const PessoaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);

export const cadastrarPessoa = async (
  pessoaData: Partial<Pessoa>
): Promise<Pessoa> => {
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

  pessoaData.dadosComuns.password = await hashPassword(
    pessoaData.dadosComuns.password
  );

  // Primeiro, salvamos a entidade intermediária
  const dadosComunsCriados = await PessoaIntermediariaRepository.save(
    pessoaData.dadosComuns
  );

  // Em seguida, associamos a entidade intermediária à entidade Pessoa
  pessoaData.dadosComuns = dadosComunsCriados;

  const novaPessoa = PessoaRepository.create(pessoaData);

  await PessoaRepository.save(novaPessoa);

  return novaPessoa;
};

export const requeryPessoas = async () => {
  const queryBuilder = PessoaRepository.createQueryBuilder("pessoa")
    .leftJoinAndSelect("pessoa.imoveisRelacionados", "proprietarioImovel")
    .leftJoinAndSelect("proprietarioImovel.registroImovel", "registroImovel")
    .addSelect(["registroImovel.caracteristicas"]); // Seleciona as características do imóvel

  const result = await queryBuilder.getMany();

  return result;
};
export const findPessoaByEmail = async (
  email: string
): Promise<Pessoa | null> => {
  // Primeiro, busca pelo e-mail na tabela intermediária
  const pessoaIntermediaria = await PessoaIntermediariaRepository.findOne({
    where: { email: email },
  });

  if (!pessoaIntermediaria) {
    return null;
  }

  // Se encontrou, agora busca na tabela de PessoaFisica baseado na relação com a PessoaIntermediaria
  const pessoaFisica = await PessoaRepository.findOne({
    where: { dadosComunsId: pessoaIntermediaria.id },
  });

  if (!pessoaFisica) {
    // Aqui você pode também implementar a busca na tabela PessoaJuridica se necessário
    return null;
  }

  return pessoaFisica;
};



export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const checkPassword = async (
  inputPassword: string,
  storedPasswordHash: string
): Promise<boolean> => {
  return bcrypt.compare(inputPassword, storedPasswordHash);
};

export const obterTodasPessoas = async (): Promise<Pessoa[]> => {
  return PessoaRepository.find();
};

export const obterPessoaPorId = async (id: number): Promise<Pessoa | undefined> => {
  // Buscando PessoaFisica junto com seus dados comuns (dados intermediários)
  const pessoaFisica = await PessoaRepository.findOne({
      where: { id: id },
      relations: ['dadosComuns']
  });

  return pessoaFisica || undefined;
};


export const deletarPessoaPorId = async (id: number): Promise<void> => {
  const pessoa = await PessoaRepository.findOne({ where: { id: id } });
  if (!pessoa) throw new Error("Pessoa não encontrada.");

  await PessoaRepository.delete(id);

  // Deletar também os dados na tabela intermediária
  if (pessoa.dadosComuns && pessoa.dadosComuns.id) {
    await PessoaIntermediariaRepository.delete(pessoa.dadosComuns.id);
  }
};



export const atualizarPessoaPorId = async (
  id: number,
  data: Pessoa
): Promise<void> => {
  const pessoa = await PessoaRepository.findOne({ where: { id: id } });
  if (!pessoa) throw new Error("Pessoa não encontrada.");

  const dataCopy = { ...data }; // Faz uma cópia superficial do objeto

  if (dataCopy.dadosComuns && dataCopy.dadosComuns.id) {
    // Atualizar os dados comuns se eles forem fornecidos
    await PessoaIntermediariaRepository.update(
      dataCopy.dadosComuns.id,
      dataCopy.dadosComuns
    );
 
  }

  await PessoaRepository.update(id, dataCopy);
};



// ... Resto do código ...
