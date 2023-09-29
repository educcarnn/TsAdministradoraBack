import { Repository } from "typeorm";
import { PessoaJuridica } from "../../entities/pessoaJuridica";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { isEmailInUse } from "../../utils/emailUtils";
import { PessoaIntermediaria } from "../../entities/pessoas/pessoa";
import { Anexo } from "../../entities/pessoas/anexo";
import { uploadFileToS3 } from "../../config/awsconfig";

export const PessoaIntermediariaRepository: Repository<PessoaIntermediaria> =
  AppDataSource.getRepository(PessoaIntermediaria);
export const PessoaJuridicaRepository: Repository<PessoaJuridica> =
  AppDataSource.getRepository(PessoaJuridica);
export const AnexoRepository: Repository<Anexo> =
  AppDataSource.getRepository(Anexo);
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

export const cadastrarPessoaJuridica = async (
  pessoaJuridicaData: Partial<PessoaJuridica>,
  files?: Express.Multer.File[]
): Promise<PessoaJuridica> => {
  if (
    !pessoaJuridicaData.dadosComuns ||
    !pessoaJuridicaData.dadosComuns.email
  ) {
    throw new Error("E-mail não fornecido.");
  }

  /*
  const emailInUse = await isEmailInUse(pessoaJuridicaData.dadosComuns.email);
  if (emailInUse) {
    throw new Error("E-mail já registrado em User ou PessoaJuridica.");
  }
  
*/
  if (!pessoaJuridicaData.dadosComuns.password) {
    throw new Error("Senha não fornecida.");
  }

  pessoaJuridicaData.dadosComuns.password = await hashPassword(
    pessoaJuridicaData.dadosComuns.password
  );

  // Primeiro, salvamos a entidade intermediária
  const dadosComunsCriados = await PessoaIntermediariaRepository.save(
    pessoaJuridicaData.dadosComuns
  );

  // Em seguida, associamos a entidade intermediária à entidade PessoaJuridica
  pessoaJuridicaData.dadosComuns = dadosComunsCriados;

  if (files && files.length) {
    for (const file of files) {
      const key = `anexosjuridica/${pessoaJuridicaData.dadosComuns.email}/${file.originalname}`;
      const fileUrl = await uploadFileToS3(file, key);

      const anexo = new Anexo();
      anexo.url = fileUrl;
      anexo.pessoa = dadosComunsCriados;

      await AnexoRepository.save(anexo);
    }
  }

  const novaPessoaJuridica =
    PessoaJuridicaRepository.create(pessoaJuridicaData);

  await PessoaJuridicaRepository.save(novaPessoaJuridica);

  return novaPessoaJuridica;
};

export const requeryPessoasJuridicas = async () => {
  const queryBuilder =
    PessoaJuridicaRepository.createQueryBuilder("pessoaJuridica");

  const pessoasJuridicas = await queryBuilder
    .leftJoinAndSelect("pessoaJuridica.empresa", "empresaRelacionada")
    .leftJoinAndSelect("pessoaJuridica.dadosComuns", "pessoaIntermediaria")

    .leftJoinAndSelect(
      "pessoaJuridica.imoveisRelacionadosJur",
      "proprietarioImovel"
    )
    //Anexos
    .leftJoinAndSelect("pessoaIntermediaria.anexos", "anexos")

    .leftJoinAndSelect("proprietarioImovel.registroImovel", "registroImovel")
    .addSelect(["registroImovel.caracteristicas"])

    .getMany();

  return pessoasJuridicas;
};

export const requeryPessoaJuridicaPorId = async (id: number) => {
  const queryBuilder =
    PessoaJuridicaRepository.createQueryBuilder("pessoaJuridica");

  const pessoaJuridica = await queryBuilder
    .where("pessoaJuridica.id = :id", { id })
    .leftJoinAndSelect("pessoaJuridica.empresa", "empresaRelacionada")
    .leftJoinAndSelect("pessoaJuridica.dadosComuns", "pessoaIntermediaria")


  //Anexos
  .leftJoinAndSelect("pessoaIntermediaria.anexos", "anexos")
  
  //Imóveis
    .leftJoinAndSelect(
      "pessoaJuridica.imoveisRelacionadosJur",
      "proprietarioImovel"
    )

    .leftJoinAndSelect("proprietarioImovel.registroImovel", "registroImovel")
    .addSelect(["registroImovel.caracteristicas"])
    .getOne();

  return pessoaJuridica;
};

export const obterTodasPessoasJuridicas = async (): Promise<
  PessoaJuridica[]
> => {
  return PessoaJuridicaRepository.find();
};

export const obterPessoaJuridicaPorId = async (
  id: number
): Promise<PessoaJuridica | undefined> => {
  const pessoaJuridica = await PessoaJuridicaRepository.findOne({
    where: { id: id },
    relations: ["dadosComuns"],
  });

  return pessoaJuridica || undefined;
};

export const deletarPessoaJuridicaPorId = async (id: number): Promise<void> => {
  const pessoaJuridica = await PessoaJuridicaRepository.findOne({
    where: { id: id },
  });
  if (!pessoaJuridica) throw new Error("PessoaJuridica não encontrada.");

  await PessoaJuridicaRepository.delete(id);

  // Deletar também os dados na tabela intermediária
  if (pessoaJuridica.dadosComuns && pessoaJuridica.dadosComuns.id) {
    await PessoaIntermediariaRepository.delete(pessoaJuridica.dadosComuns.id);
  }
};

export const atualizarPessoaJuridicaPorId = async (
  id: number,
  data: PessoaJuridica
): Promise<void> => {
  const pessoaJuridica = await PessoaJuridicaRepository.findOne({
    where: { id: id },
  });
  if (!pessoaJuridica) throw new Error("PessoaJuridica não encontrada.");

  const dataCopy = { ...data }; // Faz uma cópia superficial do objeto

  if (dataCopy.dadosComuns && dataCopy.dadosComuns.id) {
    await PessoaIntermediariaRepository.update(
      dataCopy.dadosComuns.id,
      dataCopy.dadosComuns
    );
  }

  await PessoaJuridicaRepository.update(id, dataCopy);
};
