import { Repository } from "typeorm";
import { Contrato } from "../entities/contrato";
import { AppDataSource } from "../data-source"; // Certifique-se de importar o dataSource correto
import { PessoaRepository } from "./pessoaFisica";
import { RegistroImovel } from "../entities/imovel";
const ContratoRepository: Repository<Contrato> =
  AppDataSource.getRepository(Contrato);
const ImovelRepository: Repository<RegistroImovel> = AppDataSource.getRepository(RegistroImovel)

export const cadastrarContrato = async (
  data: Contrato,
  pessoaId: number,
  imovelId: number // Adicione o ID do imóvel como um parâmetro
): Promise<Contrato> => {
  const contratoRepository = AppDataSource.getRepository(Contrato);

  const pessoa = await PessoaRepository.findOne({
    where: { id: pessoaId },
  });

  if (!pessoa) {
    throw new Error("Pessoa não encontrada");
  }

  const imovel = await ImovelRepository.findOne({
    where: { id: imovelId }, // Busque o imóvel pelo ID
  });

  if (!imovel) {
    throw new Error("Imóvel não encontrado");
  }

  const contrato = contratoRepository.create(data);
  contrato.locatarios = [pessoa];
  contrato.imoveis = [imovel]; // Associe o imóvel ao contrato

  await contratoRepository.save(contrato);

  pessoa.contratos.push(contrato);
  await PessoaRepository.save(pessoa);

  return contrato;
};

export const getContratos = async () => {
  const imoveisComPessoas = await ContratoRepository.find({
    relations: {
      locatarios: true,
      imoveis: true,
    },
  });
  return imoveisComPessoas;
};

export const obterTodosContratos = async (): Promise<Contrato[]> => {
  return ContratoRepository.find();
};

export const obterContratoPorId = async (id: number): Promise<Contrato | undefined> => {
  try {
    const getContrato = await getContratos();
    const contrato = await ContratoRepository.findOne({ where: { id: id } });

    if (contrato) {
      // Procura o imóvel nas informações carregadas
      const contratoFind = getContrato.find(item => item.id === contrato.id);

      if (contratoFind) {
        return contratoFind;
      }
    }

    return undefined;
  } catch (error) {
    console.error('Erro ao obter Contrato por ID:', error);
    return undefined;
  }
}


export const deletarContratoPorId = async (id: number): Promise<void> => {
  await ContratoRepository.delete(id);
};

export const atualizarContratoPorId = async (
  id: number,
  data: Contrato
): Promise<void> => {
  await ContratoRepository.update(id, data);
};
