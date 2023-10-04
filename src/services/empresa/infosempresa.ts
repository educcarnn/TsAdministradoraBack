import { Repository } from "typeorm";
import { Empresa } from "../../entities/empresa/empresa";
import { Pessoa } from "../../entities/pessoaFisica";
import { ProprietarioImovel } from "../../entities/relations/proprietarioImovel";
import { RegistroImovel } from "../../entities/imovel/imovel";
import { AppDataSource } from "../../data-source";

const empresaRepository: Repository<Empresa> =
  AppDataSource.getRepository(Empresa);

export const obterImoveisDaEmpresa = async (empresaId: number) => {
  try {
    const empresa = await empresaRepository
      .createQueryBuilder("empresa")
      .where("empresa.id = :empresaId", { empresaId })
      .leftJoinAndSelect("empresa.pessoas", "pessoa")
      .leftJoinAndSelect(
        "pessoa.imoveisRelacionados",
        "proprietarioImovelPessoa"
      )
      .leftJoinAndSelect("empresa.pessoaJuridicas", "pessoaJuridica")
      .leftJoinAndSelect(
        "pessoaJuridica.imoveisRelacionadosJur",
        "proprietarioImovelJuridico"
      )
      .leftJoinAndSelect(
        "proprietarioImovelJuridico.registroImovel",
        "registroImovelJuridico"
      )
      .leftJoinAndSelect(
        "proprietarioImovelPessoa.registroImovel",
        "registroImovelPessoa"
      )
      .leftJoinAndSelect(
        "proprietarioImovelJuridico.registroImovel",
        "registroImovel"
      )
      .addSelect(["registroImovel.caracteristicas"])
      .getOne();

    if (!empresa) {
      throw new Error("Empresa não encontrada.");
    }

    const imoveisDaEmpresa = [
      ...empresa.pessoas.flatMap((pessoa) =>
        pessoa.imoveisRelacionados.map(
          (proprietarioImovel) => proprietarioImovel.registroImovel
        )
      ),
      ...empresa.pessoaJuridicas.flatMap((pessoaJuridica) =>
        pessoaJuridica.imoveisRelacionadosJur.map(
          (proprietarioImovel) => proprietarioImovel.registroImovel
        )
      ),
    ];

    return imoveisDaEmpresa.filter((imovel) => imovel !== null);
  } catch (error) {
    throw new Error(`Erro ao obter imóveis da empresa`);
  }
};
