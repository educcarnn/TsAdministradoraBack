import { Repository } from "typeorm";
import { Pessoa } from "../../entities/pessoaFisica";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { isEmailInUse } from "../../utils/emailUtils";
import { PessoaIntermediaria } from "../../entities/pessoas/pessoa";
import { uploadFileToS3 } from "../../config/awsconfig";
import { Anexo } from "../../entities/pessoas/anexo";

export const PessoaIntermediariaRepository: Repository<PessoaIntermediaria> =
  AppDataSource.getRepository(PessoaIntermediaria);
export const PessoaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);
export const AnexoRepository: Repository<Anexo> =
  AppDataSource.getRepository(Anexo);

export const cadastrarPessoa = async (
  pessoaData: Partial<Pessoa>,
  files?: Express.Multer.File[]
): Promise<Pessoa> => {
  if (!pessoaData.dadosComuns || !pessoaData.dadosComuns.email) {
    throw new Error("E-mail não fornecido.");
  }

  const emailInUse = await isEmailInUse(pessoaData.dadosComuns.email);
  if (emailInUse) {
    throw new Error("E-mail já registrado em User ou Pessoa.");
  }

  if (!pessoaData.password) {
    throw new Error("Senha não fornecida.");
  }

  pessoaData.password = await hashPassword(pessoaData.password);

  const dadosComunsCriados = await PessoaIntermediariaRepository.save(
    pessoaData.dadosComuns
  );

  if (files && files.length) {
    for (const file of files) {
      const key = `anexos/${pessoaData.dadosComuns.email}/${file.originalname}`;
      const fileUrl = await uploadFileToS3(file, key);

      const anexo = new Anexo();
      anexo.url = fileUrl;
      anexo.pessoa = dadosComunsCriados;

      await AnexoRepository.save(anexo);
    }
  }

  const novaPessoa = PessoaRepository.create(pessoaData);
  await PessoaRepository.save(novaPessoa);

  return novaPessoa;
};

export const requeryPessoaPorId = async (id: number) => {
  const queryBuilder = PessoaRepository.createQueryBuilder("pessoa")
    .leftJoinAndSelect("pessoa.imoveisRelacionados", "proprietarioImovel")
    .leftJoinAndSelect("proprietarioImovel.registroImovel", "registroImovel")
    .addSelect(["registroImovel.caracteristicas"])

   
    .leftJoinAndSelect("registroImovel.inquilinos", "inquilino")
    .leftJoin("inquilino.pessoa", "pessoaInquilino")
    .addSelect(["pessoaInquilino.nome", "pessoaInquilino.id"])
    .leftJoin("inquilino.pessoaJuridica", "pessoaJuridicaInquilino")
    .addSelect([
      "pessoaJuridicaInquilino.id",
      "pessoaJuridicaInquilino.razaoSocial",
      "pessoaJuridicaInquilino.cnpj",
    ])


    .leftJoinAndSelect("pessoa.dadosComuns", "pessoaIntermediaria")
    .leftJoinAndSelect("pessoaIntermediaria.anexos", "anexos")
    .leftJoinAndSelect("pessoa.fiador", "fiador")
    .leftJoinAndSelect("fiador.imovelComoFianca", "imovelComoFianca")
    .where("pessoa.id = :id", { id });

  const result = await queryBuilder.getOne();

  return result;
};

export const requeryPessoas = async () => {
  const queryBuilder = PessoaRepository.createQueryBuilder("pessoa")
    .leftJoinAndSelect("pessoa.imoveisRelacionados", "proprietarioImovel")
    .leftJoinAndSelect("proprietarioImovel.registroImovel", "registroImovel")
    .addSelect(["registroImovel.caracteristicas"])
    .leftJoinAndSelect("pessoa.dadosComuns", "pessoaIntermediaria");

  const result = await queryBuilder.getMany();

  return result;
};

export const requeryPessoasComCaracteristicas = async () => {
  const queryBuilder = PessoaRepository.createQueryBuilder("pessoa")
    .leftJoinAndSelect("pessoa.imoveisRelacionados", "proprietarioImovel")
    .leftJoinAndSelect("proprietarioImovel.registroImovel", "registroImovel")
    .addSelect(["registroImovel.caracteristicas"])
    .leftJoinAndSelect("pessoa.dadosComuns", "pessoaIntermediaria");

  const result = await queryBuilder.getMany();

  return result;
};

export const findPessoaByEmail = async (
  email: string
): Promise<Pessoa | null> => {
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

export const obterPessoaPorId = async (
  id: number
): Promise<Pessoa | undefined> => {
  const pessoaFisica = await PessoaRepository.findOne({
    where: { id: id },
    relations: ["dadosComuns"],
  });

  return pessoaFisica || undefined;
};

export const deletarPessoaPorId = async (idPessoa: number, idIntermediario: number): Promise<void> => {
  // Encontra a pessoa pelo ID em PessoaRepository
  const pessoa = await PessoaRepository.findOne({ where: { id: idPessoa } });
  if (!pessoa) throw new Error("Pessoa não encontrada.");

  // Deleta a pessoa em PessoaRepository
  await PessoaRepository.delete(idPessoa);

 
  if (idIntermediario) {
    await PessoaIntermediariaRepository.delete(idIntermediario);
  }
};


export const atualizarPessoaPorId = async (
  id: number,
  data: Pessoa
): Promise<void> => {
  const pessoa = await PessoaRepository.findOne({ where: { id: id } });
  if (!pessoa) throw new Error("Pessoa não encontrada.");

  const dataCopy = { ...data };

  if (dataCopy.dadosComuns && dataCopy.dadosComuns.id) {
    await PessoaIntermediariaRepository.update(
      dataCopy.dadosComuns.id,
      dataCopy.dadosComuns
    );
  }

  await PessoaRepository.update(id, dataCopy);
};
