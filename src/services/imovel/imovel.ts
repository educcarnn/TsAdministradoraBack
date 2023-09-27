import { Repository } from "typeorm";
import { RegistroImovel } from "../../entities/imovel/imovel";
import { Pessoa } from "../../entities/pessoaFisica";
import { AppDataSource } from "../../data-source";
import { ProprietarioImovel } from "../../entities/relations/proprietarioImovel";
import { PessoaJuridica } from "../../entities/pessoaJuridica";
import { uploadFileToS3 } from "../../config/awsconfig";
import { Anexo } from "../../entities/pessoas/anexo";
import { Foto } from "../../entities/imovel/fotos";
import { Servico } from "../../entities/imovel/servico";

const ImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);
const AnexoRepository: Repository<Anexo> = AppDataSource.getRepository(Anexo);
const FotoRepository: Repository<Foto> = AppDataSource.getRepository(Foto); // Repositório da entidade de Fotos
const ContratoRepository: Repository<Servico> =
  AppDataSource.getRepository(Servico);

const pessoaRepository = AppDataSource.getRepository(Pessoa);
const imovelRepository = AppDataSource.getRepository(RegistroImovel);
const proprietarioImovelRepository =
  AppDataSource.getRepository(ProprietarioImovel);

const pessoaJuridicaRepository = AppDataSource.getRepository(PessoaJuridica);

export const cadastrarImovel = async (
  imovelData: RegistroImovel,
  proprietariosData: {
    id: number;
    percentual: number;
    tipo: "Física" | "Jurídica";
  }[],

  anexos?: Express.Multer.File[], // Lista de anexos
  fotos?: Express.Multer.File[], // Lista de fotos
  contratos?: Express.Multer.File[]
): Promise<RegistroImovel> => {
  const savedImovel = await imovelRepository.save(imovelData);

  for (const propData of proprietariosData) {
    let proprietario: Pessoa | PessoaJuridica | null;

    if (propData.tipo === "Física") {
      proprietario = await pessoaRepository.findOne({
        where: { id: propData.id }, // Use pessoaId em vez de id
      });
    } else {
      proprietario = await pessoaJuridicaRepository.findOne({
        where: { id: propData.id }, // Use pessoaId em vez de id
      });
    }

    if (!proprietario) {
      throw new Error(`Proprietário com ID ${propData.id} não encontrado`);
    }

    const proprietarioImovel = new ProprietarioImovel();

    if (propData.tipo === "Física") {
      proprietarioImovel.pessoa = proprietario as Pessoa;
    } else {
      proprietarioImovel.pessoaJuridica = proprietario as PessoaJuridica;
    }

    proprietarioImovel.registroImovel = savedImovel;
    proprietarioImovel.percentualPropriedade = propData.percentual;

    await proprietarioImovelRepository.save(proprietarioImovel);
  }

  if (anexos && anexos.length > 0) {
    const anexosArray: Anexo[] = []; // Array para armazenar objetos de Anexo

    for (const anexoFile of anexos) {
      const key = `imoveis/${savedImovel.id}/${anexoFile.originalname}`;
      const fileUrl = await uploadFileToS3(anexoFile, key);

      // Crie um objeto Anexo e atribua a URL
      const anexo = new Anexo();
      anexo.url = fileUrl;

      // Salve o objeto Anexo no banco de dados
      await AnexoRepository.save(anexo);

      // Adicione o objeto Anexo ao array
      anexosArray.push(anexo);
    }

    // Atribua o array de objetos de Anexo à propriedade anexos do RegistroImovel
    savedImovel.anexos = anexosArray;

    // Atualize o RegistroImovel no banco de dados com os objetos de Anexo
    await imovelRepository.save(savedImovel);
  }

  if (fotos && fotos.length > 0) {
    const fotosArray: Foto[] = []; // Array para armazenar objetos de Foto

    for (const fotoFile of fotos) {
      const key = `imoveisfotos/${savedImovel.id}/${fotoFile.originalname}`;
      const fileUrl = await uploadFileToS3(fotoFile, key);

      // Crie um objeto Foto e atribua a URL
      const foto = new Foto();
      foto.url = fileUrl;

      // Salve o objeto Foto no banco de dados
      await FotoRepository.save(foto);

      // Adicione o objeto Foto ao array
      fotosArray.push(foto);
    }

    // Atribua o array de objetos de Foto à propriedade fotos do RegistroImovel
    savedImovel.fotos = fotosArray;

    // Atualize o RegistroImovel no banco de dados com os objetos de Foto
    await imovelRepository.save(savedImovel);
  }

  if (contratos && contratos.length > 0) {
    const contratosArray: Servico[] = []; // Array para armazenar objetos de Foto

    for (const contratoFile of contratos) {
      const key = `servicoscontrato/${savedImovel.id}/${contratoFile.originalname}`;
      const fileUrl = await uploadFileToS3(contratoFile, key);

      // Crie um objeto Foto e atribua a URL
      const contrato = new Servico();
      contrato.url = fileUrl;

      await ContratoRepository.save(contrato);

      contratosArray.push(contrato);
    }

    savedImovel.servicos = contratosArray;

    await imovelRepository.save(savedImovel);
  }

  return savedImovel;
};

export const getImovelComProprietario = async (imovelId: number) => {
  const imovelComProprietario = await imovelRepository
    .createQueryBuilder("imovel")
    .where("imovel.id = :imovelId", { imovelId })

    // Busca por Pessoa Física
    .leftJoin("imovel.imoveisProprietarios", "proprietarioImovel")

    .addSelect(["proprietarioImovel.percentualPropriedade"])
    .leftJoin("proprietarioImovel.pessoa", "pessoa")
    .addSelect(["pessoa.nome", "pessoa.id"])

    // Busca por Pessoa Jurídica
    .leftJoin("proprietarioImovel.pessoaJuridica", "pessoaJuridica")
    .addSelect([
      "pessoaJuridica.razaoSocial",
      "pessoaJuridica.cnpj",
      "pessoaJuridica.id",
    ])

    // Inquilinos
    .leftJoinAndSelect("imovel.inquilinos", "inquilino")
    .leftJoin("inquilino.pessoa", "pessoaInquilino")
    .addSelect(["pessoaInquilino.nome", "pessoaInquilino.id"])
    .leftJoin("inquilino.pessoaJuridica", "pessoaJuridicaInquilino")
    .addSelect([
      "pessoaJuridicaInquilino.id",
      "pessoaJuridicaInquilino.razaoSocial",
      "pessoaJuridicaInquilino.cnpj",
    ])

    .leftJoinAndSelect("imovel.contratos", "contrato")
    .leftJoinAndSelect("imovel.anexos", "anexo")

    // Incluindo também as fotos
    .leftJoinAndSelect("imovel.fotos", "foto")
    .leftJoinAndSelect("imovel.servicos", "servicos")

    .getOne();

  return imovelComProprietario;
};

export const getImoveisComPessoas = async () => {
  const imoveisComPessoas = await imovelRepository
    .createQueryBuilder("imovel")
    .leftJoinAndSelect("imovel.imoveisProprietarios", "proprietarioImovel")

    // Busca por Pessoa Física
    .leftJoin("proprietarioImovel.pessoa", "pessoa")
    .addSelect(["pessoa.nome", "pessoa.id"])

    // Busca por Pessoa Jurídica
    .leftJoin("proprietarioImovel.pessoaJuridica", "pessoaJuridica")
    .addSelect([
      "pessoaJuridica.razaoSocial",
      "pessoaJuridica.id",
      "pessoaJuridica.cnpj",
    ])

    //Inquilinos
    .leftJoinAndSelect("imovel.inquilinos", "inquilino")
    .leftJoin("inquilino.pessoa", "pessoaInquilino")
    .addSelect(["pessoaInquilino.nome", "pessoaInquilino.id"])
    .leftJoin("inquilino.pessoaJuridica", "pessoaJuridicaInquilino")
    .addSelect([
      "pessoaJuridicaInquilino.id",
      "pessoaJuridicaInquilino.razaoSocial",
      "pessoaJuridicaInquilino.cnpj",
    ])

    .leftJoinAndSelect("imovel.contratos", "contrato")
    .leftJoinAndSelect("imovel.servicos", "servicos")
    .getMany();

  return imoveisComPessoas;
};

export const obterTodosImoveis = async (): Promise<RegistroImovel[]> => {
  return ImovelRepository.find();
};

export const obterImovelPorId = async (
  id: number
): Promise<RegistroImovel | undefined> => {
  try {
    const imoveisComPessoas = await getImoveisComPessoas();
    const imovel = await ImovelRepository.findOne({ where: { id: id } });

    if (imovel) {
      const imovelEncontrado = imoveisComPessoas.find(
        (item) => item.id === imovel.id
      );

      if (imovelEncontrado) {
        return imovelEncontrado;
      }
    }

    return undefined;
  } catch (error) {
    console.error("Erro ao obter Imóvel por ID:", error);
    return undefined;
  }
};

export const atualizarImovelPorId = async (
  id: number,
  data: Partial<RegistroImovel>
): Promise<void> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });

  if (imovel) {
    Object.assign(imovel, data);
    await ImovelRepository.save(imovel);
  }
};

export const deletarImovelPorId = async (id: number): Promise<void> => {
  const imovel = await ImovelRepository.findOne({ where: { id: id } });

  if (imovel) {
    await ImovelRepository.remove(imovel);
  }
};
