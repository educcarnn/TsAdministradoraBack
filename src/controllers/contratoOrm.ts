import { Request, Response } from 'express';
import { Contrato } from '../entities/contrato'; // Certifique-se de importar a entidade correta
import {
  cadastrarContrato,
  obterTodosContratos,
  obterContratoPorId,
  deletarContratoPorId,
  atualizarContratoPorId
} from '../services/contrato'; // Certifique-se de importar os serviços corretos
import { getContratos } from '../services/contrato';

export const CadastrarContrato = async (req: Request, res: Response): Promise<Response> => {
  const data: Contrato = req.body as Contrato;
  

  const inquilinosData: { id: number, percentual: number }[] = req.body.inquilinos; // Esta linha foi ajustada
  const proprietarioId: number = req.body.proprietarioId;
  const imovelId: number = req.body.imovelId;

  try {
    
    await cadastrarContrato(data, inquilinosData, proprietarioId, imovelId);  // Esta linha foi ajustada

    return res.status(201).json({ message: 'Contrato cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Contrato:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Contrato' });
  }
};


export const ObterTodosContratos = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const contratos = await getContratos();
    return res.status(200).json(contratos);
  } catch (error) {
    console.error('Erro ao obter todos os Contratos:', error);
    return res.status(500).json({ message: 'Erro ao obter todos os Contratos' });
  }
};

export const ObterContratoPorId = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await getContratos()
    const contrato = await obterContratoPorId(Number(id));

    if (!contrato) {
      return res.status(404).json({ message: 'Contrato não encontrado' });
    }

    return res.status(200).json(contrato);
  } catch (error) {
    console.error('Erro ao obter Contrato por ID:', error);
    return res.status(500).json({ message: 'Erro ao obter Contrato por ID' });
  }
};

export const ExcluirContrato = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await deletarContratoPorId(Number(id));
    return res.status(200).json({ message: 'Contrato excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir Contrato:', error);
    return res.status(500).json({ message: 'Erro ao excluir Contrato' });
  }
};

export const AtualizarContrato = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const data: Contrato = req.body as Contrato;

  try {
    await atualizarContratoPorId(Number(id), data);
    return res.status(200).json({ message: 'Contrato atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar Contrato:', error);
    return res.status(500).json({ message: 'Erro ao atualizar Contrato' });
  }
};
