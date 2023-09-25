import { Request, Response } from "express";

import { removerContratoDoImovelPorId } from "../../services/imovel/anexo";
import { adicionarContratosAoImovel } from "../../services/imovel/anexo";

export const adicionarContratoAoImovelController = async (
  req: Request,
  res: Response
) => {
  try {
    const { imovelId } = req.body; // Certifique-se de que este parâmetro esteja disponível no corpo da solicitação
    const contratos = req.files as Express.Multer.File[]; // Use req.files para obter a lista de fotos

    const novosContratos = await adicionarContratosAoImovel(
      parseInt(imovelId, 10), // Converte para número, se necessário
      contratos
    );

    // Responda com as novas fotos adicionadas
    res.json({ contratos: novosContratos });
  } catch (error) {
    // Lide com erros e responda adequadamente
    console.error("Erro ao adicionar contratos ao imóvel:", error);
    res.status(500).json({ error: "Erro ao adicionar contratos ao imóvel" });
  }
};

export const removerContratoDoImovelPorIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { imovelId, contratoId } = req.body; // Agora os parâmetros estão em req.body

    // Chame a função para remover o contrato do imóvel
    const novoArrayDeContratos = await removerContratoDoImovelPorId(
      parseInt(imovelId, 10),
      parseInt(contratoId, 10)
    );

    // Responda com os novos contratos após a remoção
    res.json({ contratos: novoArrayDeContratos });
  } catch (error) {
    console.error("Erro ao remover contrato:", error);
    res.status(500).json({ error: "Erro ao remover o contrato" });
  }
};
