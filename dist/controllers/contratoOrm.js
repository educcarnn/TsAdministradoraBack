"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarContrato = exports.ExcluirContrato = exports.ObterContratoPorId = exports.ObterTodosContratos = exports.CadastrarContrato = void 0;
const contrato_1 = require("../services/contrato");
const contrato_2 = require("../services/contrato");
const CadastrarContrato = async (req, res) => {
    const data = req.body;
    const inquilinoId = req.body.inquilinoId;
    const proprietarioId = req.body.proprietarioId;
    const imovelId = req.body.imovelId;
    try {
        await (0, contrato_1.cadastrarContrato)(data, inquilinoId, proprietarioId, imovelId);
        return res.status(201).json({ message: 'Contrato cadastrado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao cadastrar Contrato:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar Contrato' });
    }
};
exports.CadastrarContrato = CadastrarContrato;
const ObterTodosContratos = async (_req, res) => {
    try {
        const contratos = await (0, contrato_2.getContratos)();
        return res.status(200).json(contratos);
    }
    catch (error) {
        console.error('Erro ao obter todos os Contratos:', error);
        return res.status(500).json({ message: 'Erro ao obter todos os Contratos' });
    }
};
exports.ObterTodosContratos = ObterTodosContratos;
const ObterContratoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, contrato_2.getContratos)();
        const contrato = await (0, contrato_1.obterContratoPorId)(Number(id));
        if (!contrato) {
            return res.status(404).json({ message: 'Contrato não encontrado' });
        }
        return res.status(200).json(contrato);
    }
    catch (error) {
        console.error('Erro ao obter Contrato por ID:', error);
        return res.status(500).json({ message: 'Erro ao obter Contrato por ID' });
    }
};
exports.ObterContratoPorId = ObterContratoPorId;
const ExcluirContrato = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, contrato_1.deletarContratoPorId)(Number(id));
        return res.status(200).json({ message: 'Contrato excluído com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir Contrato:', error);
        return res.status(500).json({ message: 'Erro ao excluir Contrato' });
    }
};
exports.ExcluirContrato = ExcluirContrato;
const AtualizarContrato = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        await (0, contrato_1.atualizarContratoPorId)(Number(id), data);
        return res.status(200).json({ message: 'Contrato atualizado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao atualizar Contrato:', error);
        return res.status(500).json({ message: 'Erro ao atualizar Contrato' });
    }
};
exports.AtualizarContrato = AtualizarContrato;
