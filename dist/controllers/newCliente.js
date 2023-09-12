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
exports.AtualizarPessoaPorId = exports.DeletarPessoaPorId = exports.ObterPessoaPorId = exports.ObterTodasPessoas = exports.CadastrarPessoa = void 0;
const pessoaFisica_1 = require("../services/pessoaFisica");
const pessoaFisica_2 = require("../services/pessoaFisica");
const CadastrarPessoa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield (0, pessoaFisica_1.cadastrarPessoa)(data);
        return res.status(201).json({ message: 'Pessoa cadastrada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao cadastrar Pessoa:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar Pessoa' });
    }
});
exports.CadastrarPessoa = CadastrarPessoa;
const ObterTodasPessoas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pessoas = yield (0, pessoaFisica_2.requeryPessoas)();
        return res.status(200).json(pessoas);
    }
    catch (error) {
        console.error('Erro ao obter todas as Pessoas:', error);
        return res.status(500).json({ message: 'Erro ao obter todas as Pessoas' });
    }
});
exports.ObterTodasPessoas = ObterTodasPessoas;
const ObterPessoaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const pessoa = yield (0, pessoaFisica_1.obterPessoaPorId)(id);
        if (pessoa) {
            return res.status(200).json(pessoa);
        }
        else {
            return res.status(404).json({ message: 'Pessoa não encontrada' });
        }
    }
    catch (error) {
        console.error('Erro ao obter Pessoa por ID:', error);
        return res.status(500).json({ message: 'Erro ao obter Pessoa por ID' });
    }
});
exports.ObterPessoaPorId = ObterPessoaPorId;
const DeletarPessoaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield (0, pessoaFisica_1.deletarPessoaPorId)(id);
        return res.status(200).json({ message: 'Pessoa deletada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao deletar Pessoa por ID:', error);
        return res.status(500).json({ message: 'Erro ao deletar Pessoa por ID' });
    }
});
exports.DeletarPessoaPorId = DeletarPessoaPorId;
const AtualizarPessoaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const data = req.body;
    try {
        yield (0, pessoaFisica_1.atualizarPessoaPorId)(id, data);
        return res.status(200).json({ message: 'Pessoa atualizada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao atualizar Pessoa por ID:', error);
        return res.status(500).json({ message: 'Erro ao atualizar Pessoa por ID' });
    }
});
exports.AtualizarPessoaPorId = AtualizarPessoaPorId;
