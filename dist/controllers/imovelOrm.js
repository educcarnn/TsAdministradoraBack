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
exports.AtualizarImovel = exports.ExcluirImovel = exports.ObterImovelPorId = exports.ObterTodosImoveis = exports.CadastrarImovel = void 0;
const imovel_1 = require("../services/imovel");
const imovel_2 = require("../services/imovel");
const CadastrarImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    // Aqui, em vez de apenas obter os IDs das pessoas, estamos obtendo também os percentuais.
    const proprietariosData = req.body.proprietarios;
    try {
        yield (0, imovel_1.cadastrarImovel)(data, proprietariosData);
        return res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao cadastrar Imóvel:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar Imóvel' });
    }
});
exports.CadastrarImovel = CadastrarImovel;
const ObterTodosImoveis = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imoveisComPessoas = yield (0, imovel_2.getImoveisComPessoas)();
        return res.status(200).json(imoveisComPessoas);
    }
    catch (error) {
        console.error('Erro ao obter todos os Imóveis:', error);
        return res.status(500).json({ message: 'Erro ao obter todos os Imóveis' });
    }
});
exports.ObterTodosImoveis = ObterTodosImoveis;
const ObterImovelPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, imovel_2.getImoveisComPessoas)();
        const imovel = yield (0, imovel_1.obterImovelPorId)(Number(id));
        if (!imovel) {
            return res.status(404).json({ message: 'Imóvel não encontrado' });
        }
        return res.status(200).json(imovel);
    }
    catch (error) {
        console.error('Erro ao obter Imóvel por ID:', error);
        return res.status(500).json({ message: 'Erro ao obter Imóvel por ID' });
    }
});
exports.ObterImovelPorId = ObterImovelPorId;
const ExcluirImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, imovel_1.deletarImovelPorId)(Number(id));
        return res.status(200).json({ message: 'Imóvel excluído com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir Imóvel:', error);
        return res.status(500).json({ message: 'Erro ao excluir Imóvel' });
    }
});
exports.ExcluirImovel = ExcluirImovel;
const AtualizarImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        yield (0, imovel_1.atualizarImovelPorId)(Number(id), data);
        return res.status(200).json({ message: 'Imóvel atualizado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao atualizar Imóvel:', error);
        return res.status(500).json({ message: 'Erro ao atualizar Imóvel' });
    }
});
exports.AtualizarImovel = AtualizarImovel;
