import { uploadFileToS3 } from "../../config/awsconfig";
import { AppDataSource } from "../../data-source";
import { Anexo } from "../../entities/pessoas/anexo";
import { PessoaIntermediaria } from "../../entities/pessoas/pessoa";
import { Repository } from "typeorm";
import { deleteFileFromS3 } from "../../config/awsconfig";
import { Pessoa } from "../../entities/pessoaFisica";
import { PessoaJuridica } from "../../entities/pessoaJuridica";

const PessoaIntermediariaRepository: Repository<PessoaIntermediaria> =
  AppDataSource.getRepository(PessoaIntermediaria);
const AnexoRepository: Repository<Anexo> = AppDataSource.getRepository(Anexo);
const PessoaFisicaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);
  const PessoaJuridicaRepository: Repository<PessoaJuridica> =
  AppDataSource.getRepository(PessoaJuridica);

export const adicionarAnexoAPessoaFisica = async (
  pessoaFisicaId: number,
  anexoData: Express.Multer.File[] // Lista de anexos
) => {
  if (!pessoaFisicaId || !anexoData || anexoData.length === 0) {
    throw new Error("Parâmetros inválidos.");
  }

  try {
    const pessoaFisica = await PessoaFisicaRepository.findOne({
      where: { id: pessoaFisicaId },
      relations: ["dadosComuns.anexos"], // Certifique-se de que os anexos sejam carregados
    });

    if (!pessoaFisica) {
      throw new Error(`Pessoa física com ID ${pessoaFisicaId} não encontrada`);
    }

    const novosAnexosArray: Anexo[] = []; 

    for (const anexoFile of anexoData) {
      const s3FileKey = `anexos/${pessoaFisica.dadosComuns.email}/${anexoFile.originalname}`;
      const s3FileUrl = await uploadFileToS3(anexoFile, s3FileKey);

      const novoAnexo = new Anexo();
      novoAnexo.url = s3FileUrl;

      // Salve o novo objeto Anexo no banco de dados
      const anexoSalvo = await AnexoRepository.save(novoAnexo);

      novosAnexosArray.push(anexoSalvo);
    }

    pessoaFisica.dadosComuns.anexos = [
      ...pessoaFisica.dadosComuns.anexos,
      ...novosAnexosArray,
    ];

    await PessoaFisicaRepository.save(pessoaFisica);
    await PessoaIntermediariaRepository.save(pessoaFisica.dadosComuns);

    return novosAnexosArray;
  } catch (error) {
    console.error("Erro ao adicionar anexos à pessoa física:", error);
    throw error;
  }
};

export const removerAnexoDaPessoaFisicaPorId = async (
  pessoaFisicaId: number,
  anexoId: number
) => {
  if (!pessoaFisicaId || !anexoId) {
    throw new Error("Parâmetros inválidos.");
  }

  try {
    // Consulte a pessoa física pelo ID
    const pessoaFisica = await PessoaFisicaRepository.findOne({
      where: { id: pessoaFisicaId },
      relations: ["dadosComuns.anexos"],
    });

    if (!pessoaFisica) {
      throw new Error(`Pessoa física com ID ${pessoaFisicaId} não encontrada`);
    }

    // Encontre o índice do anexo pelo ID
    const indexAnexoParaRemover = pessoaFisica.dadosComuns.anexos.findIndex(
      (anexo) => anexo.id === anexoId
    );

    if (indexAnexoParaRemover === -1) {
      throw new Error(`Anexo com ID ${anexoId} não encontrado`);
    }

    // Remova o anexo do Amazon S3 usando a propriedade 'url' do anexo
    if (pessoaFisica.dadosComuns.anexos[indexAnexoParaRemover].url) {
      await deleteFileFromS3(pessoaFisica.dadosComuns.anexos[indexAnexoParaRemover].url);
    }

    // Remova o anexo do array de anexos da pessoa física
    pessoaFisica.dadosComuns.anexos.splice(indexAnexoParaRemover, 1);

    // Salve as alterações na pessoa física
    await PessoaFisicaRepository.save(pessoaFisica);
    await PessoaIntermediariaRepository.save(pessoaFisica.dadosComuns);

    return pessoaFisica.dadosComuns.anexos; // Retorna o novo array de anexos da pessoa física após a remoção
  } catch (error) {
    console.error("Erro ao remover o anexo da pessoa física:", error);
    throw error;
  }
};


export const adicionarAnexoAPessoaJuridica = async (
  pessoaJuridicaId: number,
  anexoData: Express.Multer.File[] // Lista de anexos
) => {
  if (!pessoaJuridicaId || !anexoData || anexoData.length === 0) {
    throw new Error("Parâmetros inválidos.");
  }

  try {
    const pessoaJuridica = await PessoaJuridicaRepository.findOne({
      where: { id: pessoaJuridicaId },
      relations: ["dadosComuns.anexos"], // Certifique-se de que os anexos sejam carregados
    });

    if (!pessoaJuridica) {
      throw new Error(`Pessoa jurídica com ID ${pessoaJuridicaId} não encontrada`);
    }

    const novosAnexosArray: Anexo[] = [];

    for (const anexoFile of anexoData) {
      const s3FileKey = `anexos/${pessoaJuridica.dadosComuns.email}/${anexoFile.originalname}`;
      const s3FileUrl = await uploadFileToS3(anexoFile, s3FileKey);

      const novoAnexo = new Anexo();
      novoAnexo.url = s3FileUrl;

      // Salve o novo objeto Anexo no banco de dados
      const anexoSalvo = await AnexoRepository.save(novoAnexo);

      novosAnexosArray.push(anexoSalvo);
    }

    pessoaJuridica.dadosComuns.anexos = [
      ...pessoaJuridica.dadosComuns.anexos,
      ...novosAnexosArray,
    ];

    await PessoaJuridicaRepository.save(pessoaJuridica);
    await PessoaIntermediariaRepository.save(pessoaJuridica.dadosComuns);

    return novosAnexosArray;
  } catch (error) {
    console.error("Erro ao adicionar anexos à pessoa jurídica:", error);
    throw error;
  }
};


export const removerAnexoDaPessoaJuridicaPorId = async (
  pessoaJuridicaId: number,
  anexoId: number
) => {
  if (!pessoaJuridicaId || !anexoId) {
    throw new Error("Parâmetros inválidos.");
  }

  try {
    // Consulte a pessoa jurídica pelo ID
    const pessoaJuridica = await PessoaJuridicaRepository.findOne({
      where: { id: pessoaJuridicaId },
      relations: ["dadosComuns.anexos"],
    });

    if (!pessoaJuridica) {
      throw new Error(`Pessoa jurídica com ID ${pessoaJuridicaId} não encontrada`);
    }

    // Encontre o índice do anexo pelo ID
    const indexAnexoParaRemover = pessoaJuridica.dadosComuns.anexos.findIndex(
      (anexo) => anexo.id === anexoId
    );

    if (indexAnexoParaRemover === -1) {
      throw new Error(`Anexo com ID ${anexoId} não encontrado`);
    }

    // Remova o anexo do Amazon S3 usando a propriedade 'url' do anexo
    if (pessoaJuridica.dadosComuns.anexos[indexAnexoParaRemover].url) {
      await deleteFileFromS3(pessoaJuridica.dadosComuns.anexos[indexAnexoParaRemover].url);
    }

    // Remova o anexo do array de anexos da pessoa jurídica
    pessoaJuridica.dadosComuns.anexos.splice(indexAnexoParaRemover, 1);

    // Salve as alterações na pessoa jurídica
    await PessoaJuridicaRepository.save(pessoaJuridica);
    await PessoaIntermediariaRepository.save(pessoaJuridica.dadosComuns);

    return pessoaJuridica.dadosComuns.anexos; // Retorna o novo array de anexos da pessoa jurídica após a remoção
  } catch (error) {
    console.error("Erro ao remover o anexo da pessoa jurídica:", error);
    throw error;
  }
};
