import { Request, Response } from 'express';
import { removerAnexoDoImovelPorId } from '../../services/imovel/anexo';
import { adicionarAnexoAoImovel } from '../../services/imovel/anexo';
import { removerFotosDoImovel } from '../../services/imovel/anexo';
import { adicionarFotosAoImovel } from '../../services/imovel/anexo';

// Controlador para remover um anexo de um imóvel por ID
export const removerAnexoDoImovelPorIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { imovelId, anexoId } = req.body; // Agora os parâmetros estão em req.body

    // Chame a função para remover o anexo do imóvel
    const novoArrayDeAnexos = await removerAnexoDoImovelPorId(
      parseInt(imovelId, 10), // Converte para número, se necessário
      parseInt(anexoId, 10) // Converte para número, se necessário
    );

    // Responda com os novos anexos após a remoção
    res.json({ anexos: novoArrayDeAnexos });
  } catch (error) {
    // Lide com erros e responda adequadamente
    console.error('Erro ao remover anexo:', error);
    res.status(500).json({ error: 'Erro ao remover o anexo' });
  }
};

export const adicionarAnexoAoImovelController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { imovelId } = req.body; // Certifique-se de que este parâmetro esteja disponível no corpo da solicitação
      const anexos = req.files as Express.Multer.File[]; // Use req.files para obter a lista de anexos
  /*
      if (!imovelId || !anexos || anexos.length === 0) {
        res.status(400).json({ error: 'Parâmetros inválidos.' });
        return;
      }
  */
      // Chame a função para adicionar anexos ao imóvel
      const novosAnexos = await adicionarAnexoAoImovel(
        parseInt(imovelId, 10), // Converte para número, se necessário
        anexos
      );
  
      // Responda com os novos anexos adicionados
      res.json({ anexos: novosAnexos });
    } catch (error) {
      // Lide com erros e responda adequadamente
      console.error('Erro ao adicionar anexos ao imóvel:', error);
      res.status(500).json({ error: 'Erro ao adicionar anexos ao imóvel' });
    }
  };

  export const removerFotoDoImovelPorIdController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { imovelId, fotoId } = req.body; // Agora os parâmetros estão em req.body
  
      // Chame a função para remover a foto do imóvel
      const novoArrayDeFotos = await removerFotosDoImovel(
        parseInt(imovelId, 10), // Converte para número, se necessário
        parseInt(fotoId, 10) // Converte para número, se necessário
      );
  
      // Responda com os novos anexos após a remoção
      res.json({ fotos: novoArrayDeFotos });
    } catch (error) {
      // Lide com erros e responda adequadamente
      console.error('Erro ao remover foto:', error);
      res.status(500).json({ error: 'Erro ao remover a foto' });
    }
  };

  export const adicionarFotoAoImovelController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { imovelId } = req.body; // Certifique-se de que este parâmetro esteja disponível no corpo da solicitação
      const fotos = req.files as Express.Multer.File[]; // Use req.files para obter a lista de fotos
  
      // Chame a função para adicionar fotos ao imóvel
      const novasFotos = await adicionarFotosAoImovel(
        parseInt(imovelId, 10), // Converte para número, se necessário
        fotos
      );
  
      // Responda com as novas fotos adicionadas
      res.json({ fotos: novasFotos });
    } catch (error) {
      // Lide com erros e responda adequadamente
      console.error('Erro ao adicionar fotos ao imóvel:', error);
      res.status(500).json({ error: 'Erro ao adicionar fotos ao imóvel' });
    }
  };