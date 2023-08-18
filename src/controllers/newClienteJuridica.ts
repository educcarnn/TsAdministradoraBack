import { Request, Response } from 'express';
import { PessoaJuridica } from '../entities/pessoaJuridica';
import { cadastrarPessoaJuridica, obterTodasPessoasJuridicas } from '../services/pessoaJuridica';

export const CadastrarPessoaJuridica = async (req: Request, res: Response): Promise<Response> => {
  const data: PessoaJuridica = req.body;

  try {
    await cadastrarPessoaJuridica(data);
    return res.status(201).json({ message: 'Pessoa jurídica cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Pessoa Jurídica:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Pessoa Jurídica' });
  }
};

export const ObterTodasPessoasJuridicas = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const pessoasJuridicas = await obterTodasPessoasJuridicas();
    return res.status(200).json(pessoasJuridicas);
  } catch (error) {
    console.error('Erro ao obter todas as Pessoas Jurídicas:', error);
    return res.status(500).json({ message: 'Erro ao obter todas as Pessoas Jurídicas' });
  }
};
