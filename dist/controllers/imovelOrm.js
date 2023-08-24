"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarImovel = exports.ExcluirImovel = exports.ObterImovelPorId = exports.ObterTodosImoveis = exports.CadastrarImovel = void 0;
const imovel_1 = require("../services/imovel");
const imovel_2 = require("../services/imovel");
const CadastrarImovel = async (req, res) => {
    const data = req.body;
    const pessoaId = req.body.pessoaId;
    try {
        await (0, imovel_1.cadastrarImovel)(data, pessoaId);
        return res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao cadastrar Imóvel:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar Imóvel' });
    }
};
exports.CadastrarImovel = CadastrarImovel;
const ObterTodosImoveis = async (_req, res) => {
    try {
        const imoveisComPessoas = await (0, imovel_2.getImoveisComPessoas)();
        return res.status(200).json(imoveisComPessoas);
    }
    catch (error) {
        console.error('Erro ao obter todos os Imóveis:', error);
        return res.status(500).json({ message: 'Erro ao obter todos os Imóveis' });
    }
};
exports.ObterTodosImoveis = ObterTodosImoveis;
const ObterImovelPorId = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, imovel_2.getImoveisComPessoas)();
        const imovel = await (0, imovel_1.obterImovelPorId)(Number(id));
        if (!imovel) {
            return res.status(404).json({ message: 'Imóvel não encontrado' });
        }
        return res.status(200).json(imovel);
    }
    catch (error) {
        console.error('Erro ao obter Imóvel por ID:', error);
        return res.status(500).json({ message: 'Erro ao obter Imóvel por ID' });
    }
};
exports.ObterImovelPorId = ObterImovelPorId;
const ExcluirImovel = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, imovel_1.deletarImovelPorId)(Number(id));
        return res.status(200).json({ message: 'Imóvel excluído com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir Imóvel:', error);
        return res.status(500).json({ message: 'Erro ao excluir Imóvel' });
    }
};
exports.ExcluirImovel = ExcluirImovel;
const AtualizarImovel = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        await (0, imovel_1.atualizarImovelPorId)(Number(id), data);
        return res.status(200).json({ message: 'Imóvel atualizado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao atualizar Imóvel:', error);
        return res.status(500).json({ message: 'Erro ao atualizar Imóvel' });
    }
};
exports.AtualizarImovel = AtualizarImovel;
