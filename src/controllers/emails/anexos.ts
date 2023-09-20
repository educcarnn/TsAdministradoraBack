import { Request, Response } from 'express';
import { RegistroImovel } from '../../entities/imovel';
import {
  cadastrarImovelComAnexos,
  deletarAnexosDoImovel
} from "../../services/emails/anexos"

export const CadastrarImovelComAnexos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Extrair o ID do imóvel dos parâmetros da rota (path parameter)
  const imovelId: number = Number(req.params.imovelId);
  const filesArray = Array.isArray(req.files) ? req.files : undefined;

  try {
    const imovelCadastrado = await cadastrarImovelComAnexos(imovelId, filesArray);
    return res.status(201).json({ message: "Imóvel com anexos cadastrado com sucesso!", imovel: imovelCadastrado });
  } catch (error) {
    console.error("Erro ao cadastrar Imóvel com anexos:", error);
    return res.status(500).json({ message: "Erro ao cadastrar Imóvel com anexos" });
  }
};

export const DeletarAnexosImovel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    await deletarAnexosDoImovel(Number(id));
    return res.status(204).send(); // 204 No Content para indicação de sucesso na exclusão
  } catch (error) {
    console.error("Erro ao deletar anexos do Imóvel:", error);
    return res.status(500).json({ message: "Erro ao deletar anexos do Imóvel" });
  }
};


