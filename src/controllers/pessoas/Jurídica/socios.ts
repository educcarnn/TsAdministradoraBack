import { Request, Response } from "express";
import { Socio } from "../../../entities/pessoas/juridica/socio";
import {
  cadastrarSocio,
  obterSocioPorId,
  excluirSocio,
  atualizarSocio,
} from "../../../services/pessoas/Jurídica/socio";

export const CadastrarSocio = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { sociosData, pessoaJuridicaId } = req.body; // Atualize os dados recebidos

  try {
    await cadastrarSocio(sociosData, pessoaJuridicaId); // Passe os dados corretos para a função do serviço
    return res.status(201).json({ message: "Sócio cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar Sócio:", error);
    return res.status(500).json({ message: "Erro ao cadastrar Sócio" });
  }
};

export const ObterSocioPorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const socio = await obterSocioPorId(Number(id));

    if (!socio) {
      return res.status(404).json({ message: "Sócio não encontrado" });
    }

    return res.status(200).json(socio);
  } catch (error) {
    console.error("Erro ao obter Sócio por ID:", error);
    return res.status(500).json({ message: "Erro ao obter Sócio por ID" });
  }
};

export const ExcluirSocio = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { socioId } = req.body;

  try {
    await excluirSocio(Number(socioId));
    return res.status(200).json({ message: "Sócio excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir Sócio:", error);
    return res.status(500).json({ message: "Erro ao excluir Sócio" });
  }
};


export const AtualizarSocios = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { socios } = req.body; // Receba a lista de Sócios a serem atualizados

  try {
    // Itere pela lista de Sócios e atualize cada um deles
    for (const socio of socios) {
      await atualizarSocio(socio.id, socio);
    }

    return res.status(200).json({ message: "Sócios atualizados com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar Sócios:", error);
    return res.status(500).json({ message: "Erro ao atualizar Sócios" });
  }
};
