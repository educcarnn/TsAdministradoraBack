import { Repository } from "typeorm";
import { Socio } from "../../../entities/pessoas/juridica/socio";// Certifique-se de importar a entidade correta
import { AppDataSource } from "../../../data-source";
import { PessoaJuridica } from "../../../entities/pessoaJuridica";

const SocioRepository: Repository<Socio> = AppDataSource.getRepository(Socio);
const PessoaJuridicaRepository: Repository<PessoaJuridica> = AppDataSource.getRepository(PessoaJuridica)

export const cadastrarSocio = async (
    sociosData: { nome: string }[],
    pessoaJuridicaId: number
  ): Promise<Socio[]> => {
    const novosSocios: Socio[] = [];
  
    for (const socioData of sociosData) {
      const novoSocio = new Socio();
      novoSocio.nome = socioData.nome;
  
      // Associe o sócio à PessoaJuridica
      const pessoaJuridica = await PessoaJuridicaRepository.findOne({
        where: { id: pessoaJuridicaId },
      });
  
      if (!pessoaJuridica) {
        throw new Error(`Pessoa Jurídica com ID ${pessoaJuridicaId} não encontrada`);
      }
  
      novoSocio.pessoaJuridica = pessoaJuridica;
  
      const savedSocio = await SocioRepository.save(novoSocio);
      novosSocios.push(savedSocio);
    }
  
    return novosSocios;
  };
  

export const obterSocioPorId = async (
  id: number
): Promise<Socio | undefined> => {
  return (
    (await SocioRepository.findOne({
      where: { id: id },
    })) || undefined
  );
};

export const atualizarSocio = async (
  id: number,
  socioData: Partial<Socio>
): Promise<Socio> => {
  const socioExistente = await SocioRepository.findOne({
    where: { id: id },
  });

  if (!socioExistente) {
    throw new Error(`Sócio com ID ${id} não encontrado`);
  }

  SocioRepository.merge(socioExistente, socioData);
  return await SocioRepository.save(socioExistente);
};

export const excluirSocio = async (socioId: number): Promise<void> => {
  // Encontre o sócio pelo ID
  const socio = await SocioRepository.findOne({
    where: { id: socioId },
  });
  if (!socio) {
    throw new Error(`Sócio com ID ${socioId} não encontrado`);
  }

  // Exclua o sócio
  await SocioRepository.remove(socio);
};

// Listar todos os Sócios
export const listarSocios = async (): Promise<Socio[]> => {
  return await SocioRepository.find();
};
