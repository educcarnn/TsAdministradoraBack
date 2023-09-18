import { Request, Response } from 'express';
import { RegistroImovel } from '../entities/imovel';
import {
  cadastrarImovel,
  obterTodosImoveis,
  obterImovelPorId,
  deletarImovelPorId,
  atualizarImovelPorId
} from '../services/imovel';
import { getImoveisComPessoas } from '../services/imovel';
import { getImovelComProprietario } from '../services/imovel';
export const CadastrarImovel = async (req: Request, res: Response): Promise<Response> => {
  const data: RegistroImovel = req.body as RegistroImovel;

  // Aqui, em vez de apenas obter os IDs das pessoas, estamos obtendo também os percentuais.
  const proprietariosData = req.body.proprietarios;

  try {
    await cadastrarImovel(data, proprietariosData);
    return res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Imóvel:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Imóvel' });
  }
};


export const ObterTodosImoveis = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const imoveisComPessoas = await getImoveisComPessoas();
    return res.status(200).json(imoveisComPessoas);
  } catch (error) {
    console.error('Erro ao obter todos os Imóveis:', error);
    return res.status(500).json({ message: 'Erro ao obter todos os Imóveis' });
  }
};


export const ObterImovelPorId = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const imovel = await getImovelComProprietario(Number(id));

    if (!imovel) {
      return res.status(404).json({ message: 'Imóvel não encontrado' });
    }

    return res.status(200).json(imovel);
  } catch (error) {
    console.error('Erro ao obter Imóvel por ID:', error);
    return res.status(500).json({ message: 'Erro ao obter Imóvel por ID' });
  }
};


export const ExcluirImovel = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await deletarImovelPorId(Number(id));
    return res.status(200).json({ message: 'Imóvel excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir Imóvel:', error);
    return res.status(500).json({ message: 'Erro ao excluir Imóvel' });
  }
};

export const AtualizarImovel = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const data: RegistroImovel = req.body as RegistroImovel;

  try {
    await atualizarImovelPorId(Number(id), data);
    return res.status(200).json({ message: 'Imóvel atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar Imóvel:', error);
    return res.status(500).json({ message: 'Erro ao atualizar Imóvel' });
  }
};
