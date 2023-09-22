// Importe as entidades e bibliotecas necessárias
import { deleteFileFromS3 } from "../../config/awsconfig";
import { RegistroImovel } from "../../entities/imovel/imovel";
import { AppDataSource } from "../../data-source";
import { Anexo } from "../../entities/pessoas/anexo";
import { Repository } from "typeorm";
import { uploadFileToS3 } from "../../config/awsconfig";
import { Foto } from "../../entities/imovel/fotos";

const ImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);
const AnexoRepository: Repository<Anexo> = AppDataSource.getRepository(Anexo);
const FotoRepository: Repository<Foto> = AppDataSource.getRepository(Foto)

export const removerAnexoDoImovelPorId = async (
  imovelId: number,
  anexoId: number
) => {
  if (!imovelId || !anexoId) {
    throw new Error("Parâmetros inválidos.");
  }

  try {
    // Consulte o imóvel pelo ID
    const imovel = await ImovelRepository.findOne({
      where: { id: imovelId },
      relations: ["anexos"],
    });

    if (!imovel) {
      throw new Error(`Imóvel com ID ${imovelId} não encontrado`);
    }

    const anexoParaRemover = await AnexoRepository.findOne({
      where: { id: anexoId },
    });

    if (!anexoParaRemover) {
      throw new Error(`Anexo com ID ${anexoId} não encontrado`);
    }

    // Remova o anexo do Amazon S3 usando a propriedade 'url' do anexo
    if (anexoParaRemover.url) {
      await deleteFileFromS3(anexoParaRemover.url);
    }

    // Remova a referência do anexo do array de anexos do imóvel
    const novoArrayDeAnexos = imovel.anexos.filter(
      (anexo) => anexo.id !== anexoId
    );

    // Atualize o array de anexos do imóvel com o novo array
    imovel.anexos = novoArrayDeAnexos;

    // Salve as alterações no imóvel
    await ImovelRepository.save(imovel);

    return novoArrayDeAnexos;
  } catch (error) {
    console.error("Erro ao remover o anexo do imóvel:", error);
    throw error;
  }
};

export const adicionarAnexoAoImovel = async (
  imovelId: number,
  anexoData: Express.Multer.File[] // Lista de anexos
) => {
  if (!imovelId || !anexoData || anexoData.length === 0) {
    throw new Error("Parâmetros inválidos.");
  }

  try {

    const imovel = await ImovelRepository.findOne({
      where: { id: imovelId },
      relations: ["anexos"],
    });

    if (!imovel) {
      throw new Error(`Imóvel com ID ${imovelId} não encontrado`);
    }

    const novosAnexosArray: Anexo[] = []; // Array para armazenar novos objetos de Anexo

    for (const anexoFile of anexoData) {

      const s3FileKey = `imoveis/${imovelId}/${anexoFile.originalname}`;
      const s3FileUrl = await uploadFileToS3(anexoFile, s3FileKey);

      // Crie um novo objeto de Anexo com a URL do arquivo no S3
      const novoAnexo = new Anexo();
      novoAnexo.url = s3FileUrl;

      // Salve o novo objeto Anexo no banco de dados
      const anexoSalvo = await AnexoRepository.save(novoAnexo);

      // Adicione o objeto Anexo ao array de novos anexos
      novosAnexosArray.push(anexoSalvo);
    }

    // Combina os anexos existentes do imóvel com os novos anexos
    imovel.anexos = [...imovel.anexos, ...novosAnexosArray];

    // Salve as alterações no imóvel
    await ImovelRepository.save(imovel);

    return novosAnexosArray;
  } catch (error) {
    console.error("Erro ao adicionar anexos ao imóvel:", error);
    throw error;
  }
};

export const adicionarFotosAoImovel = async (
    imovelId: number,
    novasFotos: Express.Multer.File[]
  ) => {

    if (!imovelId) {
        throw new Error(`Imóvel com ID ${imovelId} não encontrado`);
      }
  
    try {
      // Consulte o imóvel pelo ID
      const imovel = await ImovelRepository.findOne({
        where: { id: imovelId },
        relations: ["fotos"], // Supondo que você tenha uma relação chamada "fotos" no seu modelo de imóvel
      });
  
      if (!imovel) {
        throw new Error(`Imóvel com ID ${imovelId} não encontrado`);
      }
  
      const fotosParaAdicionar = [];
  
      // Faça o upload das novas fotos para o Amazon S3
      for (const novaFoto of novasFotos) {
        const key = `imoveisfotos/${imovelId}/${novaFoto.originalname}`;
        const fileUrl = await uploadFileToS3(novaFoto, key);
  
        // Crie um objeto de Foto com a URL
        const foto = new Foto();
        foto.url = fileUrl;
        
        // Salve o objeto Foto no banco de dados
        await FotoRepository.save(foto);
        
        // Adicione o objeto Foto ao array
        fotosParaAdicionar.push(foto);
      }
  
      // Adicione as novas fotos ao array de fotos do imóvel
      imovel.fotos = [...imovel.fotos, ...fotosParaAdicionar];
  
      // Salve as alterações no imóvel
      await ImovelRepository.save(imovel);
  
      return imovel.fotos;
    } catch (error) {
      console.error("Erro ao adicionar fotos ao imóvel:", error);
      throw error;
    }
  };


  export const removerFotosDoImovel = async (
    imovelId: number,
    anexoId: number
  ) => {
    if (!imovelId || !anexoId) {
      throw new Error("Parâmetros inválidos.");
    }
  
    try {
      // Consulte o imóvel pelo ID
      const imovel = await ImovelRepository.findOne({
        where: { id: imovelId },
        relations: ["fotos"], // Supondo que você tenha uma relação chamada "fotos" no seu modelo de imóvel
      });
  
      if (!imovel) {
        throw new Error(`Imóvel com ID ${imovelId} não encontrado`);
      }
  
      const fotoParaRemover = imovel.fotos.find((foto) => foto.id === anexoId);
  
      if (!fotoParaRemover) {
        throw new Error(`Anexo com ID ${anexoId} não encontrado no imóvel`);
      }
  
      // Remova a foto do Amazon S3 usando a propriedade 'url' da foto
      if (fotoParaRemover.url) {
        await deleteFileFromS3(fotoParaRemover.url);
      }
  
      // Remova a referência da foto do array de fotos do imóvel
      const novoArrayDeFotos = imovel.fotos.filter(
        (foto) => foto.id !== anexoId
      );
  
      // Atualize o array de fotos do imóvel com o novo array
      imovel.fotos = novoArrayDeFotos;
  
      // Salve as alterações no imóvel
      await ImovelRepository.save(imovel);
  
      return novoArrayDeFotos;
    } catch (error) {
      console.error("Erro ao remover a foto do imóvel:", error);
      throw error;
    }
  };
  
  