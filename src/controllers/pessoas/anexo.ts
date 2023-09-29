import { Request, Response } from "express";
import {
  adicionarAnexoAPessoaFisica,
removerAnexoDaPessoaFisicaPorId,
 adicionarAnexoAPessoaJuridica,
  removerAnexoDaPessoaJuridicaPorId,
} from "../../services/pessoas/anexo";

export const adicionarAnexoAPessoaFisicaController = async (
  req: Request,
  res: Response
) => {
  try {
    const { pessoaFisicaId } = req.body;
    const anexos = req.files as Express.Multer.File[];

    const novosAnexos = await adicionarAnexoAPessoaFisica(
      parseInt(pessoaFisicaId, 10),
      anexos
    );

    res.json({ anexos: novosAnexos });
  } catch (error) {
    console.error("Erro ao adicionar anexos à pessoa física:", error);
    res.status(500).json({ error: "Erro ao adicionar anexos à pessoa física" });
  }
};

export const removerAnexoDaPessoaFisicaPorIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { pessoaFisicaId, anexoId } = req.body;

    const novoArrayDeAnexos = await removerAnexoDaPessoaFisicaPorId(
      parseInt(pessoaFisicaId, 10),
      parseInt(anexoId, 10)
    );

    res.json({ anexos: novoArrayDeAnexos });
  } catch (error) {
    console.error("Erro ao remover anexo da pessoa física:", error);
    res.status(500).json({ error: "Erro ao remover o anexo da pessoa física" });
  }
};

export const adicionarAnexoAPessoaJuridicaController = async (
  req: Request,
  res: Response
) => {
  try {
    const { pessoaJuridicaId } = req.body;
    const anexos = req.files as Express.Multer.File[];

    const novosAnexos = await adicionarAnexoAPessoaJuridica(
      parseInt(pessoaJuridicaId, 10),
      anexos
    );

    res.json({ anexos: novosAnexos });
  } catch (error) {
    console.error("Erro ao adicionar anexos à pessoa jurídica:", error);
    res
      .status(500)
      .json({ error: "Erro ao adicionar anexos à pessoa jurídica" });
  }
};

export const removerAnexoDaPessoaJuridicaPorIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { pessoaJuridicaId, anexoId } = req.body;

    const novoArrayDeAnexos = await removerAnexoDaPessoaJuridicaPorId(
      parseInt(pessoaJuridicaId, 10),
      parseInt(anexoId, 10)
    );

    res.json({ anexos: novoArrayDeAnexos });
  } catch (error) {
    console.error("Erro ao remover anexo da pessoa jurídica:", error);
    res
      .status(500)
      .json({ error: "Erro ao remover o anexo da pessoa jurídica" });
  }
};
