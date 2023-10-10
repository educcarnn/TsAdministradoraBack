import { Repository } from "typeorm";
import { PessoaJuridica } from "../../entities/pessoaJuridica";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { isEmailInUse } from "../../utils/emailUtils";
import { PessoaIntermediaria } from "../../entities/pessoas/pessoa";
import { Anexo } from "../../entities/pessoas/anexo";
import { uploadFileToS3 } from "../../config/awsconfig";
import { Socio } from "../../entities/pessoas/juridica/socio";
import { Empresa } from "../../entities/empresa/empresa";

export const PessoaIntermediariaRepository: Repository<PessoaIntermediaria> =
  AppDataSource.getRepository(PessoaIntermediaria);
export const PessoaJuridicaRepository: Repository<PessoaJuridica> =
  AppDataSource.getRepository(PessoaJuridica);
export const AnexoRepository: Repository<Anexo> =
  AppDataSource.getRepository(Anexo);
export const SocioRepository: Repository<Socio> =
  AppDataSource.getRepository(Socio);

  export const EmpresaRepository: Repository<Empresa> =
  AppDataSource.getRepository(Empresa);


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

export const findPessoaJuridicaByEmail = async (
  email: string
): Promise<PessoaJuridica | null> => {
  const pessoaIntermediaria = await PessoaIntermediariaRepository.findOne({
    where: { email: email },
  });

  if (!pessoaIntermediaria) {
    return null;
  }

  const pessoaJuridica = await PessoaJuridicaRepository.findOne({
    where: { dadosComunsId: pessoaIntermediaria.id }, // Use 'pessoaIntermediaria.id' como a condição de pesquisa
  });

  if (!pessoaJuridica) {
    return null;
  }

  return pessoaJuridica;
};

export const cadastrarPessoaJuridica = async (
  pessoaJuridicaData: Partial<PessoaJuridica>,
  socioData: { nome: string }[],
  files?: Express.Multer.File[]
): Promise<PessoaJuridica> => {
  if (
    !pessoaJuridicaData.dadosComuns ||
    !pessoaJuridicaData.dadosComuns.email
  ) {
    throw new Error("E-mail não fornecido.");
  }

  const emailInUse = await isEmailInUse(pessoaJuridicaData.dadosComuns.email);
  if (emailInUse) {
    throw new Error("E-mail já registrado em User ou PessoaJuridica.");
  }

  if (!pessoaJuridicaData.password) {
    throw new Error("Senha não fornecida.");
  }

  pessoaJuridicaData.password = await hashPassword(pessoaJuridicaData.password);

  const dadosComunsCriados = await PessoaIntermediariaRepository.save(
    pessoaJuridicaData.dadosComuns
  );

  pessoaJuridicaData.dadosComuns = dadosComunsCriados;
  const novaPessoaJuridica =
    PessoaJuridicaRepository.create(pessoaJuridicaData);

  await PessoaJuridicaRepository.save(novaPessoaJuridica);

  for (const socioInfo of socioData) {
    const socio = new Socio();
    socio.nome = socioInfo.nome;

    socio.pessoaJuridica = novaPessoaJuridica;

    await SocioRepository.save(socio);
  }

  
  if (pessoaJuridicaData.role === "userjur") {
    if (pessoaJuridicaData.empresa) {
      const empresa = await EmpresaRepository.findOne({
        where: { id: pessoaJuridicaData.empresa.id },
      });

      if (!empresa) {
        throw new Error("Empresa não encontrada.");
      }
      pessoaJuridicaData.empresa = empresa;
    }
  }

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

  // Retorne a nova instância de PessoaJuridica
  return novaPessoaJuridica;
};

export const requeryPessoasJuridicas = async () => {
  const queryBuilder =
    PessoaJuridicaRepository.createQueryBuilder("pessoaJuridica");

  const pessoasJuridicas = await queryBuilder
    .leftJoinAndSelect("pessoaJuridica.empresa", "empresaRelacionada")
    .leftJoinAndSelect("pessoaJuridica.socios", "socio")
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
    .leftJoinAndSelect("pessoaJuridica.socios", "socio")
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
    
    .leftJoinAndSelect("registroImovel.inquilinos", "inquilino")
    .leftJoin("inquilino.pessoa", "pessoaInquilino")
    .addSelect(["pessoaInquilino.nome", "pessoaInquilino.id"])
    .leftJoin("inquilino.pessoaJuridica", "pessoaJuridicaInquilino")
    .addSelect([
      "pessoaJuridicaInquilino.id",
      "pessoaJuridicaInquilino.razaoSocial",
      "pessoaJuridicaInquilino.cnpj",
    ])
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

export const deletarPessoaJuridicaPorId = async (
  idPessoaJuridica: number,
  idIntermediario: number
): Promise<void> => {
  const pessoaJuridica = await PessoaJuridicaRepository.findOne({
    where: { id: idPessoaJuridica },
  });
  if (!pessoaJuridica) throw new Error("PessoaJuridica não encontrada.");

  await PessoaJuridicaRepository.delete(idPessoaJuridica);

  if (idIntermediario) {
    await PessoaIntermediariaRepository.delete(idIntermediario);
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

  const dataCopy = { ...data };

  if (dataCopy.dadosComuns && dataCopy.dadosComuns.id) {
    await PessoaIntermediariaRepository.update(
      dataCopy.dadosComuns.id,
      dataCopy.dadosComuns
    );
  }

  await PessoaJuridicaRepository.update(id, dataCopy);
};
