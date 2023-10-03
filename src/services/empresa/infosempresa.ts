import { Repository } from "typeorm";
import { Empresa } from "../../entities/empresa/empresa";
import { Pessoa } from "../../entities/pessoaFisica";
import { ProprietarioImovel } from "../../entities/relations/proprietarioImovel";
import { RegistroImovel } from "../../entities/imovel/imovel";
import { AppDataSource } from "../../data-source";

const empresaRepository: Repository<Empresa> = AppDataSource.getRepository(
    Empresa
  );
  const pessoaRepository: Repository<Pessoa> = AppDataSource.getRepository(
    Pessoa
  );
export const obterImoveisDaEmpresa = async (
  empresaId: number
) => {
  try {
    const empresa = await empresaRepository
      .createQueryBuilder("empresa")
      .where("empresa.id = :empresaId", { empresaId })
      .leftJoinAndSelect("empresa.pessoas", "pessoa")
      .leftJoinAndSelect("pessoa.imoveisRelacionados", "proprietarioImovel")
      .leftJoinAndSelect("proprietarioImovel.registroImovel", "registroImovel")
      .getOne();

    if (!empresa) {
      throw new Error("Empresa não encontrada.");
    }

    // Extraia os imóveis da empresa
    const imoveisDaEmpresa = empresa.pessoas.flatMap((pessoa) =>
      pessoa.imoveisRelacionados.map(
        (proprietarioImovel) => proprietarioImovel.registroImovel
      )
    );

    return imoveisDaEmpresa;
  } catch (error) {
    throw new Error(`Erro ao obter imóveis da empresa: ${error.message}`);
  }
};
