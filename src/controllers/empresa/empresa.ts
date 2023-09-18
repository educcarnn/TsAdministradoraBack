import { Request, Response } from 'express';
import { Empresa } from '../../entities/empresa/empresa';
import {
  criarEmpresa,
  obterTodasEmpresas,
  obterEmpresaPorId,
  deletarEmpresaPorId,
  atualizarEmpresaPorId
} from '../../services/empresa/empresa'; // Atualize o caminho do import para o arquivo de serviço
import { requeryEmpresas } from '../../services/empresa/empresa';

export const CadastrarEmpresa = async (req: Request, res: Response): Promise<Response> => {
  const data: Empresa = req.body as Empresa;

  try {
    await criarEmpresa(data);
    return res.status(201).json({ message: 'Empresa cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Empresa:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Empresa' });
  }
};

export const ObterTodasEmpresas = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const empresas = await requeryEmpresas();
    return res.status(200).json(empresas);
  } catch (error) {
    console.error('Erro ao obter todas as Empresas:', error);
    return res.status(500).json({ message: 'Erro ao obter todas as Empresas' });
  }
};

export const ObterEmpresaPorId = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const empresa = await obterEmpresaPorId(Number(id));

    if (!empresa) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }

    return res.status(200).json(empresa);
  } catch (error) {
    console.error('Erro ao obter Empresa por ID:', error);
    return res.status(500).json({ message: 'Erro ao obter Empresa por ID' });
  }
};

export const ExcluirEmpresa = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await deletarEmpresaPorId(Number(id));
    return res.status(200).json({ message: 'Empresa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir Empresa:', error);
    return res.status(500).json({ message: 'Erro ao excluir Empresa' });
  }
};

export const AtualizarEmpresa = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const data: Empresa = req.body as Empresa;

  try {
    await atualizarEmpresaPorId(Number(id), data);
    return res.status(200).json({ message: 'Empresa atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar Empresa:', error);
    return res.status(500).json({ message: 'Erro ao atualizar Empresa' });
  }
};
