import { Request, Response } from "express";
import { adicionarPessoaAEmpresa, removerPessoaDaEmpresa } from "../../services/empresa/relationsEmpresa";

export const adicionarPessoaController = async (req: Request, res: Response) => {
  try {
    const empresaId = Number(req.params.empresaId);
    const pessoaData = req.body;

    const pessoa = await adicionarPessoaAEmpresa(empresaId, pessoaData);

    return res.status(201).json(pessoa);
  } catch (error) {
    console.error('Erro ao adicionar pessoa à Empresa: ', error);
    return res.status(500).json({ message: 'Erro ao adicionar pessoa à Empresa' });
  }
};

export const removerPessoaController = async (req: Request, res: Response) => {
  try {
    const empresaId = Number(req.params.empresaId);
    const pessoaId = Number(req.params.pessoaId);

    await removerPessoaDaEmpresa(empresaId, pessoaId);

    return res.status(204).send(); // 204 No Content para deleções bem-sucedidas
  } catch (error) {
    console.error('Erro ao remover pessoa à Empresa: ', error);
    return res.status(500).json({ message: 'Erro ao remover pessoa à Empresa' });
  }
};
