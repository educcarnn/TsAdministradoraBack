import { Request, Response } from "express";
import { Inquilino } from "../../entities/pessoas/inquilino";
import {
  cadastrarInquilino,
  obterInquilinoPorId,
  excluirInquilino,
  atualizarInquilino,
} from "../../services/pessoas/inquilino";

export const CadastrarInquilino = async (req: Request, res: Response): Promise<Response> => {
  const { inquilinosData, imovelId, status } = req.body; // Atualize os dados recebidos

  try {
    await cadastrarInquilino(inquilinosData, imovelId, status); // Passe os dados corretos para a função do serviço
    return res.status(201).json({ message: 'Inquilino cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Inquilino:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Inquilino' });
  }
};

export const ObterInquilinoPorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const inquilino = await obterInquilinoPorId(Number(id));

    if (!inquilino) {
      return res.status(404).json({ message: "Inquilino não encontrado" });
    }

    return res.status(200).json(inquilino);
  } catch (error) {
    console.error("Erro ao obter Inquilino por ID:", error);
    return res.status(500).json({ message: "Erro ao obter Inquilino por ID" });
  }
};

export const ExcluirInquilino = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { inquilinoId } = req.body;

  try {
    await excluirInquilino(Number(inquilinoId));
    return res.status(200).json({ message: "Inquilino excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir Inquilino:", error);
    return res.status(500).json({ message: "Erro ao excluir Inquilino" });
  }
};

export const AtualizarInquilino = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const data: Inquilino = req.body as Inquilino;

  try {
    await atualizarInquilino(Number(id), data);
    return res.status(200).json({ message: "Inquilino atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar Inquilino:", error);
    return res.status(500).json({ message: "Erro ao atualizar Inquilino" });
  }
};
