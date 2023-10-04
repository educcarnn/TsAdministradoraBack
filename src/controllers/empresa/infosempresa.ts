import { Request, Response } from "express";
import { obterImoveisDaEmpresa } from "../../services/empresa/infosempresa";


export const obterImoveisDaEmpresaController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params; 
    const imoveisDaEmpresa = await obterImoveisDaEmpresa(Number(id));

    res.status(200).json(imoveisDaEmpresa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter imóveis da empresa" });
  }
};

