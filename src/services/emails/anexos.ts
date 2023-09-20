import { RegistroImovel } from "../../entities/imovel";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Anexo } from "../../entities/pessoas/anexo";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from 'aws-sdk'

export const ImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);

export const AnexoRepository: Repository<Anexo> =
  AppDataSource.getRepository(Anexo);

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = "tsadministradora-files";
const REGION = "us-east-1";

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not set in environment variables.");
}

const s3Config = {
  region: REGION,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
};

const s3Client = new S3Client(s3Config);

const s3 = new S3(); // Crie uma instância do cliente AWS S3

export const checkIfFileExistsInS3 = async (key: string): Promise<boolean> => {
  try {
    await s3.headObject({ Bucket: BUCKET_NAME, Key: key }).promise();
    return true; // O arquivo existe
  } catch (error: any) { // Adicione ': any' para tratar 'error' como tipo 'any'
    if (error.statusCode === 404) {
      return false; // O arquivo não existe
    }
    throw error; // Outro erro ocorreu, trate conforme necessário
  }
};

export const uploadFileToS3 = async (
  file: Express.Multer.File,
  key: string
): Promise<string> => {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "private",
  };

  const uploader = new Upload({
    client: s3Client,
    params: uploadParams,
  });

  await uploader.done();

  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
};

export const cadastrarImovelComAnexos = async (
  imovelId: number,
  files?: Express.Multer.File[]
): Promise<RegistroImovel> => {

  /*
  if (!imovelId) {
    throw new Error("ID do imóvel não fornecido ou inválido.");
  }
*/
  const imovelExistente = await ImovelRepository.findOne({
    where: { id: imovelId },
  });

  if (!imovelExistente) {
    throw new Error("Imóvel não encontrado.");
  }

  if (!files || files.length === 0) {
    throw new Error("Nenhum anexo fornecido para enviar.");
  }

  for (const file of files) {
    const key = `anexosImoveis/${imovelId}/${file.originalname}`;

    // Verifique se o arquivo já existe no S3 antes de fazer o upload
    const fileExists = await checkIfFileExistsInS3(key);

    if (!fileExists) {
      const fileUrl = await uploadFileToS3(file, key);

      // Crie o objeto Anexo e associe ao imóvel
      const anexo = new Anexo();
      anexo.url = fileUrl;
      anexo.imovel = imovelExistente; // Associe o anexo ao imóvel existente

      await AnexoRepository.save(anexo);
    }
  }

  return imovelExistente;
};





export const deletarAnexosDoImovel = async (
  imovelId: number
): Promise<void> => {
  const imovel = await ImovelRepository.findOne({
    where: { id: imovelId },
    relations: ["anexos"],
  });

  if (!imovel) {
    throw new Error("Imóvel não encontrado.");
  }

  // Deletar cada anexo no S3
  for (const anexo of imovel.anexos) {
    const urlParts = anexo.url.split("/");
    const key = urlParts.slice(3).join("/"); // Para extrair a parte da 'chave' do URL do S3

    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    try {
      await s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.error("Erro ao deletar o arquivo no S3:", error);
    }

    // Deletar a referência do anexo no banco de dados
    await AnexoRepository.delete(anexo.id);
  }
};
