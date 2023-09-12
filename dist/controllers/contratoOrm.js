"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarContrato = exports.ExcluirContrato = exports.ObterContratoPorId = exports.ObterTodosContratos = exports.CadastrarContrato = void 0;
const contrato_1 = require("../services/contrato"); // Certifique-se de importar os serviços corretos
const contrato_2 = require("../services/contrato");
const CadastrarContrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    // Obtenha os IDs do inquilino, proprietário e imóvel do corpo da requisição
    const inquilinoId = req.body.inquilinoId;
    const proprietarioId = req.body.proprietarioId;
    const imovelId = req.body.imovelId;
    try {
        // Passe os IDs corretos para o serviço
        yield (0, contrato_1.cadastrarContrato)(data, inquilinoId, proprietarioId, imovelId);
        return res.status(201).json({ message: 'Contrato cadastrado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao cadastrar Contrato:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar Contrato' });
    }
});
exports.CadastrarContrato = CadastrarContrato;
const ObterTodosContratos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contratos = yield (0, contrato_2.getContratos)();
        return res.status(200).json(contratos);
    }
    catch (error) {
        console.error('Erro ao obter todos os Contratos:', error);
        return res.status(500).json({ message: 'Erro ao obter todos os Contratos' });
    }
});
exports.ObterTodosContratos = ObterTodosContratos;
const ObterContratoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, contrato_2.getContratos)();
        const contrato = yield (0, contrato_1.obterContratoPorId)(Number(id));
        if (!contrato) {
            return res.status(404).json({ message: 'Contrato não encontrado' });
        }
        return res.status(200).json(contrato);
    }
    catch (error) {
        console.error('Erro ao obter Contrato por ID:', error);
        return res.status(500).json({ message: 'Erro ao obter Contrato por ID' });
    }
});
exports.ObterContratoPorId = ObterContratoPorId;
const ExcluirContrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, contrato_1.deletarContratoPorId)(Number(id));
        return res.status(200).json({ message: 'Contrato excluído com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir Contrato:', error);
        return res.status(500).json({ message: 'Erro ao excluir Contrato' });
    }
});
exports.ExcluirContrato = ExcluirContrato;
const AtualizarContrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        yield (0, contrato_1.atualizarContratoPorId)(Number(id), data);
        return res.status(200).json({ message: 'Contrato atualizado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao atualizar Contrato:', error);
        return res.status(500).json({ message: 'Erro ao atualizar Contrato' });
    }
});
exports.AtualizarContrato = AtualizarContrato;
