import { Request, Response } from "express";
import { Fiador } from "../../entities/pessoas/fiador";
import {
  cadastrarFiador,
  obterFiadorPorId,
  excluirContratoDeFiador,
  atualizarFiador,
} from "../../services/pessoas/fiador";

export const CadastrarFiador = async (req: Request, res: Response): Promise<Response> => {
  const { pessoaId, imovelId, numeroMatriculaRGI } = req.body; // Adicione "numeroMatriculaRGI" aqui

  try {
    await cadastrarFiador(pessoaId, imovelId, numeroMatriculaRGI); // Passe "numeroMatriculaRGI" para a função do serviço
    return res.status(201).json({ message: 'Fiador cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Fiador:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Fiador' });
  }
};
export const ObterFiadorPorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const fiador = await obterFiadorPorId(Number(id));

    if (!fiador) {
      return res.status(404).json({ message: "Fiador não encontrado" });
    }

    return res.status(200).json(fiador);
  } catch (error) {
    console.error("Erro ao obter Fiador por ID:", error);
    return res.status(500).json({ message: "Erro ao obter Fiador por ID" });
  }
};

export const ExcluirFiador = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { fiadorId } = req.body;

  try {
    await excluirContratoDeFiador(Number(fiadorId));
    return res.status(200).json({ message: "Fiador excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir Fiador:", error);
    return res.status(500).json({ message: "Erro ao excluir Fiador" });
  }
};

export const AtualizarFiador = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const data: Fiador = req.body as Fiador;

  try {
    await atualizarFiador(Number(id), data);
    return res.status(200).json({ message: "Fiador atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar Fiador:", error);
    return res.status(500).json({ message: "Erro ao atualizar Fiador" });
  }
};
