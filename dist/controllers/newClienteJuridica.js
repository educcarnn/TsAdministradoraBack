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
exports.ObterPessoaJuridicaPorId = exports.AtualizarPessoaJuridicaPorId = exports.DeletarPessoaJuridicaPorId = exports.ObterTodasPessoasJuridicas = exports.CadastrarPessoaJuridica = void 0;
const pessoaJuridica_1 = require("../services/pessoaJuridica");
const CadastrarPessoaJuridica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield (0, pessoaJuridica_1.cadastrarPessoaJuridica)(data);
        return res.status(201).json({ message: 'Pessoa jurídica cadastrada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao cadastrar Pessoa Jurídica:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar Pessoa Jurídica' });
    }
});
exports.CadastrarPessoaJuridica = CadastrarPessoaJuridica;
const ObterTodasPessoasJuridicas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pessoasJuridicas = yield (0, pessoaJuridica_1.obterTodasPessoasJuridicas)();
        return res.status(200).json(pessoasJuridicas);
    }
    catch (error) {
        console.error('Erro ao obter todas as Pessoas Jurídicas:', error);
        return res.status(500).json({ message: 'Erro ao obter todas as Pessoas Jurídicas' });
    }
});
exports.ObterTodasPessoasJuridicas = ObterTodasPessoasJuridicas;
const DeletarPessoaJuridicaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield (0, pessoaJuridica_1.deletarPessoaJuridicaPorId)(id);
        return res.status(200).json({ message: 'Pessoa jurídica deletada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao deletar Pessoa Jurídica por ID:', error);
        return res.status(500).json({ message: 'Erro ao deletar Pessoa Jurídica por ID' });
    }
});
exports.DeletarPessoaJuridicaPorId = DeletarPessoaJuridicaPorId;
const AtualizarPessoaJuridicaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const data = req.body;
    try {
        yield (0, pessoaJuridica_1.atualizarPessoaJuridicaPorId)(id, data);
        return res.status(200).json({ message: 'Pessoa jurídica atualizada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao atualizar Pessoa Jurídica por ID:', error);
        return res.status(500).json({ message: 'Erro ao atualizar Pessoa Jurídica por ID' });
    }
});
exports.AtualizarPessoaJuridicaPorId = AtualizarPessoaJuridicaPorId;
const ObterPessoaJuridicaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const pessoaJuridica = yield (0, pessoaJuridica_1.obterPessoaJuridicaPorId)(id);
        if (pessoaJuridica) {
            return res.status(200).json(pessoaJuridica);
        }
        else {
            return res.status(404).json({ message: 'Pessoa jurídica não encontrada' });
        }
    }
    catch (error) {
        console.error('Erro ao obter Pessoa Jurídica por ID:', error);
        return res.status(500).json({ message: 'Erro ao obter Pessoa Jurídica por ID' });
    }
});
exports.ObterPessoaJuridicaPorId = ObterPessoaJuridicaPorId;
