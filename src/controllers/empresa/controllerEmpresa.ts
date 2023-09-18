import { Request, Response } from "express";
import { adicionarPessoaAEmpresa, removerPessoaDaEmpresa, associarAdminAEmpresa, associarPessoaJuridicaAEmpresa } from "../../services/empresa/relationsEmpresa";

export const adicionarPessoaController = async (req: Request, res: Response) => {
  try {
    const { empresaId, pessoaId } = req.body;

    const pessoa = await adicionarPessoaAEmpresa(Number(empresaId), Number(pessoaId));

    return res.status(201).json(pessoa);
  } catch (error) {
    console.error('Erro ao adicionar pessoa à Empresa: ', error);
    return res.status(500).json({ message: 'Erro ao adicionar pessoa à Empresa' });
  }
};

export const removerPessoaController = async (req: Request, res: Response) => {
  try {
    const { empresaId, pessoaId } = req.body;

    await removerPessoaDaEmpresa(Number(empresaId), Number(pessoaId));

    return res.status(204).send(); // 204 No Content para deleções bem-sucedidas
  } catch (error) {
    console.error('Erro ao remover pessoa à Empresa: ', error);
    return res.status(500).json({ message: 'Erro ao remover pessoa à Empresa' });
  }
};


export const associarAdminController = async (req: Request, res: Response) => {
  try {
    const { empresaId, userId } = req.body;

    await associarAdminAEmpresa(Number(empresaId), Number(userId));

    return res.status(201).json({ message: 'Administrador associado à empresa com sucesso!' });
  } catch (error) {
    console.error('Erro ao associar administrador à Empresa: ', error);
    return res.status(500).json({ message: 'Erro ao associar administrador à Empresa' });
  }
};

export const associarPessoaJuridicaController = async (req: Request, res: Response) => {
  try {
    const { empresaId, pessoaJuridicaId } = req.body;

    await associarPessoaJuridicaAEmpresa(Number(empresaId), Number(pessoaJuridicaId));

    return res.status(201).json({ message: 'Pessoa Jurídica associada à empresa com sucesso!' });
  } catch (error) {
    console.error('Erro ao associar Pessoa Jurídica à Empresa: ', error);
    return res.status(500).json({ message: 'Erro ao associar Pessoa Jurídica à Empresa' });
  }
};