import { Request, Response } from 'express';
import { RegistroImovel } from '../entities/imovel';
import {
  cadastrarImovel,
  obterTodosImoveis,
} from '../services/imovel';

export const CadastrarImovel = async (req: Request, res: Response): Promise<Response> => {
  const data: RegistroImovel = req.body;

  try {
    await cadastrarImovel(data);
    return res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Imóvel:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Imóvel' });
  }
};

export const ObterTodosImoveis = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const imoveis = await obterTodosImoveis();
    return res.status(200).json(imoveis);
  } catch (error) {
    console.error('Erro ao obter todos os Imóveis:', error);
    return res.status(500).json({ message: 'Erro ao obter todos os Imóveis' });
  }
};
