import { Request, Response } from 'express';
import { Pessoa } from '../entities/pessoaFisica';
import { cadastrarPessoa, obterTodasPessoas, obterPessoaPorId, deletarPessoaPorId, atualizarPessoaPorId} from '../services/pessoaFisica';

export const CadastrarPessoa = async (req: Request, res: Response): Promise<Response> => {
  const data: Pessoa = req.body;

  try {
    await cadastrarPessoa(data);
    return res.status(201).json({ message: 'Pessoa cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Pessoa:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Pessoa' });
  }
};

export const ObterTodasPessoas = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const pessoas = await obterTodasPessoas();
    return res.status(200).json(pessoas);
  } catch (error) {
    console.error('Erro ao obter todas as Pessoas:', error);
    return res.status(500).json({ message: 'Erro ao obter todas as Pessoas' });
  }
};



export const ObterPessoaPorId = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  try {
    const pessoa = await obterPessoaPorId(id);
    if (pessoa) {
      return res.status(200).json(pessoa);
    } else {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao obter Pessoa por ID:', error);
    return res.status(500).json({ message: 'Erro ao obter Pessoa por ID' });
  }
};


export const DeletarPessoaPorId = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  try {
    await deletarPessoaPorId(id);
    return res.status(200).json({ message: 'Pessoa deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar Pessoa por ID:', error);
    return res.status(500).json({ message: 'Erro ao deletar Pessoa por ID' });
  }
};

export const AtualizarPessoaPorId = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const data: Pessoa = req.body;

  try {
    await atualizarPessoaPorId(id, data);
    return res.status(200).json({ message: 'Pessoa atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar Pessoa por ID:', error);
    return res.status(500).json({ message: 'Erro ao atualizar Pessoa por ID' });
  }
};