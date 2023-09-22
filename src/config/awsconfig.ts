
import { S3Client, PutObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = 'tsadministradora-files';
const REGION = 'us-east-1';


if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not set in environment variables.");
}

interface S3Config {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

const s3Config: S3Config = {
  region: "us-east-1",
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
};

const s3Client = new S3Client(s3Config);

export const uploadFileToS3 = async (file: Express.Multer.File, key: string): Promise<string> => {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'private'
  };

  const uploader = new Upload({
    client: s3Client,
    params: uploadParams
  });

  await uploader.done();

  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
};


export const deleteFileFromS3 = async (fileName: string): Promise<void> => {
  const deleteParams = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  const deleteCommand = new DeleteObjectCommand(deleteParams);

  try {
    await s3Client.send(deleteCommand);
  } catch (error) {
    console.error(`Erro ao excluir o arquivo ${fileName} do S3:`, error);
    throw error;
  }
};