import { Request, Response } from 'express';
import { Imovel } from '../models/imovel'; // Certifique-se de importar o modelo correto

// Crie um array para armazenar os imóveis cadastrados
const imoveisCadastrados: Imovel[] = [];

// Função para registrar um novo imóvel
export const registrarImovel = (req: Request, res: Response) => {
  // Lógica para registrar o imóvel
  try {
    const { id, inquilino, proprietario, numeroImovel } = req.body;

    // Crie um novo imóvel com base nos dados da solicitação
    const novoImovel: Imovel = {
      id,
      inquilino,
      proprietario,
      numeroImovel,
    };

    // Salve o imóvel no banco de dados ou na fonte de dados apropriada
    // Exemplo: imovelRepository.create(novoImovel);

 
    imoveisCadastrados.push(novoImovel);


    res.status(201).json(novoImovel);
  } catch (error) {
    console.error('Erro ao registrar imóvel:', error);
    res.status(500).json({ error: 'Erro ao registrar imóvel' });
  }
};

// Função para obter todos os imóveis
export const obterImoveis = (req: Request, res: Response) => {
  // Lógica para obter todos os imóveis
  try {
    // Retorna a lista de imóveis cadastrados como resposta
    res.status(200).json(imoveisCadastrados);
  } catch (error) {
    console.error('Erro ao obter imóveis:', error);
    res.status(500).json({ error: 'Erro ao obter imóveis' });
  }
};

// Outras funções de controle de imóvel, se necessário
