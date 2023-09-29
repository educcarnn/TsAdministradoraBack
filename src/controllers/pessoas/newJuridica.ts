import { Request, Response } from 'express';
import { PessoaJuridica } from '../../entities/pessoaJuridica';
import { cadastrarPessoaJuridica, obterTodasPessoasJuridicas, atualizarPessoaJuridicaPorId, deletarPessoaJuridicaPorId, obterPessoaJuridicaPorId} from '../../services/pessoas/pessoaJuridica';
import { requeryPessoasJuridicas } from '../../services/pessoas/pessoaJuridica';
import { requeryPessoaJuridicaPorId } from '../../services/pessoas/pessoaJuridica';

export const CadastrarPessoaJuridica = async (req: Request, res: Response): Promise<Response> => {
  const pessoaJuridicaData: Partial<PessoaJuridica> = req.body;
  const files = req.files as Express.Multer.File[]; 

  try {
    const novaPessoaJuridica = await cadastrarPessoaJuridica(pessoaJuridicaData, files);
    return res.status(201).json({ message: 'Pessoa jurídica cadastrada com sucesso!', novaPessoaJuridica });
  } catch (error) {
    console.error('Erro ao cadastrar Pessoa Jurídica:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Pessoa Jurídica' });
  }
};

export const ObterTodasPessoasJuridicas = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const pessoasJuridicas = await requeryPessoasJuridicas();
    return res.status(200).json(pessoasJuridicas);
  } catch (error) {
    console.error('Erro ao obter todas as Pessoas Jurídicas:', error);
    return res.status(500).json({ message: 'Erro ao obter todas as Pessoas Jurídicas' });
  }
};

export const DeletarPessoaJuridicaPorId = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  try {
    await deletarPessoaJuridicaPorId(id);
    return res.status(200).json({ message: 'Pessoa jurídica deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar Pessoa Jurídica por ID:', error);
    return res.status(500).json({ message: 'Erro ao deletar Pessoa Jurídica por ID' });
  }
};

export const AtualizarPessoaJuridicaPorId = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const data: PessoaJuridica = req.body;

  try {
    await atualizarPessoaJuridicaPorId(id, data);
    return res.status(200).json({ message: 'Pessoa jurídica atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar Pessoa Jurídica por ID:', error);
    return res.status(500).json({ message: 'Erro ao atualizar Pessoa Jurídica por ID' });
  }
};

export const ObterPessoaJuridicaPorId = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  try {

    const pessoaJuridica = await requeryPessoaJuridicaPorId(id);

    if (pessoaJuridica) {
      return res.status(200).json(pessoaJuridica);
    } else {
      return res.status(404).json({ message: 'Pessoa jurídica não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao obter Pessoa Jurídica por ID:', error);
    return res.status(500).json({ message: 'Erro ao obter Pessoa Jurídica por ID' });
  }
};
