"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterImoveis = exports.registrarImovel = void 0;
// Crie um array para armazenar os imóveis cadastrados
const imoveisCadastrados = [];
// Função para registrar um novo imóvel
const registrarImovel = (req, res) => {
    // Lógica para registrar o imóvel
    try {
        const { id, inquilino, proprietario, numeroImovel } = req.body;
        // Crie um novo imóvel com base nos dados da solicitação
        const novoImovel = {
            id,
            inquilino,
            proprietario,
            numeroImovel,
        };
        // Salve o imóvel no banco de dados ou na fonte de dados apropriada
        // Exemplo: imovelRepository.create(novoImovel);
        imoveisCadastrados.push(novoImovel);
        res.status(201).json(novoImovel);
    }
    catch (error) {
        console.error('Erro ao registrar imóvel:', error);
        res.status(500).json({ error: 'Erro ao registrar imóvel' });
    }
};
exports.registrarImovel = registrarImovel;
// Função para obter todos os imóveis
const obterImoveis = (req, res) => {
    // Lógica para obter todos os imóveis
    try {
        // Retorna a lista de imóveis cadastrados como resposta
        res.status(200).json(imoveisCadastrados);
    }
    catch (error) {
        console.error('Erro ao obter imóveis:', error);
        res.status(500).json({ error: 'Erro ao obter imóveis' });
    }
};
exports.obterImoveis = obterImoveis;
// Outras funções de controle de imóvel, se necessário
