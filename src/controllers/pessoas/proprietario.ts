import { Request, Response } from "express";
import { ProprietarioImovel } from "../../entities/relations/proprietarioImovel";
import {
  cadastrarProprietario,
  obterProprietarioPorId,
  excluirProprietario,
  atualizarProprietario,
} from "../../services/pessoas/proprietario";

export const CadastrarProprietario = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { proprietariosData, imovelId } = req.body; // Atualize os dados recebidos

  try {
    await cadastrarProprietario(imovelId, proprietariosData); // Passe os dados corretos para a função do serviço
    return res.status(201).json({ message: 'Proprietário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Proprietário:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar Proprietário' });
  }
};

export const ObterProprietarioPorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const proprietario = await obterProprietarioPorId(Number(id));

    if (!proprietario) {
      return res.status(404).json({ message: "Proprietário não encontrado" });
    }

    return res.status(200).json(proprietario);
  } catch (error) {
    console.error("Erro ao obter Proprietário por ID:", error);
    return res.status(500).json({ message: "Erro ao obter Proprietário por ID" });
  }
};

export const ExcluirProprietario = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { proprietarioId } = req.body;

  try {
    await excluirProprietario(Number(proprietarioId));
    return res.status(200).json({ message: "Proprietário excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir Proprietário:", error);
    return res.status(500).json({ message: "Erro ao excluir Proprietário" });
  }
};

export const AtualizarProprietario = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const data: ProprietarioImovel = req.body as ProprietarioImovel;

  try {
    await atualizarProprietario(Number(id), data);
    return res.status(200).json({ message: "Proprietário atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar Proprietário:", error);
    return res.status(500).json({ message: "Erro ao atualizar Proprietário" });
  }
};
