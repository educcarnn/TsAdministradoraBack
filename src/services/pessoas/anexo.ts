import { uploadFileToS3 } from "../../config/awsconfig";
import { AppDataSource } from "../../data-source";
import { Anexo } from "../../entities/pessoas/anexo";
import { PessoaIntermediaria } from "../../entities/pessoas/pessoa";
import { Repository } from "typeorm";
import { deleteFileFromS3 } from "../../config/awsconfig";
import { Pessoa } from "../../entities/pessoaFisica";

const PessoaIntermediariaRepository: Repository<PessoaIntermediaria> =
  AppDataSource.getRepository(PessoaIntermediaria);
const AnexoRepository: Repository<Anexo> = AppDataSource.getRepository(Anexo);
const PessoaFisicaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);

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

    // Salve as alterações na pessoa física
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


export const adicionarFotosAPessoaJuridica = async (
  pessoaJuridicaId: number,
  novasFotos: Express.Multer.File[]
) => {
  if (!pessoaJuridicaId) {
    throw new Error(
      `Pessoa jurídica com ID ${pessoaJuridicaId} não encontrada`
    );
  }

  try {
    // Consulte a pessoa jurídica pelo ID
    const pessoaJuridica = await PessoaIntermediariaRepository.findOne({
      where: { id: pessoaJuridicaId },
      relations: ["anexos"],
    });

    if (!pessoaJuridica) {
      throw new Error(
        `Pessoa jurídica com ID ${pessoaJuridicaId} não encontrada`
      );
    }

    const fotosParaAdicionar = [];

    for (const novaFoto of novasFotos) {
      const key = `anexosjuridica/${pessoaJuridicaId}/${novaFoto.originalname}`;
      const fileUrl = await uploadFileToS3(novaFoto, key);

      // Crie um objeto de Anexo com a URL
      const anexo = new Anexo();
      anexo.url = fileUrl;

      // Salve o anexo no banco de dados
      await PessoaIntermediariaRepository.save(anexo);

      // Adicione o objeto Anexo ao array
      fotosParaAdicionar.push(anexo);
    }

    // Adicione as novas fotos ao array de anexos da pessoa jurídica
    pessoaJuridica.anexos = [...pessoaJuridica.anexos, ...fotosParaAdicionar];

    await PessoaIntermediariaRepository.save(pessoaJuridica);

    return pessoaJuridica.anexos;
  } catch (error) {
    console.error("Erro ao adicionar fotos à pessoa jurídica:", error);
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
    const pessoaJuridica = await PessoaIntermediariaRepository.findOne({
      where: { id: pessoaJuridicaId },
      relations: ["anexos"],
    });

    if (!pessoaJuridica) {
      throw new Error(
        `Pessoa jurídica com ID ${pessoaJuridicaId} não encontrada`
      );
    }

    // Encontre o anexo pelo ID
    const anexoParaRemover = pessoaJuridica.anexos.find(
      (anexo) => anexo.id === anexoId
    );

    if (!anexoParaRemover) {
      throw new Error(
        `Anexo com ID ${anexoId} não encontrado na pessoa jurídica`
      );
    }

    if (anexoParaRemover.url) {
      await deleteFileFromS3(anexoParaRemover.url);
    }

    // Remova a referência do anexo do array de anexos da pessoa jurídica
    pessoaJuridica.anexos = pessoaJuridica.anexos.filter(
      (anexo) => anexo.id !== anexoId
    );

    // Salve as alterações na pessoa jurídica
    await PessoaIntermediariaRepository.save(pessoaJuridica);

    return pessoaJuridica.anexos; // Retorna o novo array de anexos da pessoa jurídica após a remoção
  } catch (error) {
    console.error("Erro ao remover o anexo da pessoa jurídica:", error);
    throw error;
  }
};
