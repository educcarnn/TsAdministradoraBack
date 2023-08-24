"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarPessoaPorId = exports.DeletarPessoaPorId = exports.ObterPessoaPorId = exports.ObterTodasPessoas = exports.CadastrarPessoa = void 0;
const pessoaFisica_1 = require("../services/pessoaFisica");
const pessoaFisica_2 = require("../services/pessoaFisica");
const CadastrarPessoa = async (req, res) => {
    const data = req.body;
    try {
        await (0, pessoaFisica_1.cadastrarPessoa)(data);
        return res.status(201).json({ message: 'Pessoa cadastrada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao cadastrar Pessoa:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar Pessoa' });
    }
};
exports.CadastrarPessoa = CadastrarPessoa;
const ObterTodasPessoas = async (_req, res) => {
    try {
        const pessoas = await (0, pessoaFisica_2.requeryPessoas)();
        return res.status(200).json(pessoas);
    }
    catch (error) {
        console.error('Erro ao obter todas as Pessoas:', error);
        return res.status(500).json({ message: 'Erro ao obter todas as Pessoas' });
    }
};
exports.ObterTodasPessoas = ObterTodasPessoas;
const ObterPessoaPorId = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const pessoa = await (0, pessoaFisica_1.obterPessoaPorId)(id);
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
};
exports.ObterPessoaPorId = ObterPessoaPorId;
const DeletarPessoaPorId = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await (0, pessoaFisica_1.deletarPessoaPorId)(id);
        return res.status(200).json({ message: 'Pessoa deletada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao deletar Pessoa por ID:', error);
        return res.status(500).json({ message: 'Erro ao deletar Pessoa por ID' });
    }
};
exports.DeletarPessoaPorId = DeletarPessoaPorId;
const AtualizarPessoaPorId = async (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    try {
        await (0, pessoaFisica_1.atualizarPessoaPorId)(id, data);
        return res.status(200).json({ message: 'Pessoa atualizada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao atualizar Pessoa por ID:', error);
        return res.status(500).json({ message: 'Erro ao atualizar Pessoa por ID' });
    }
};
exports.AtualizarPessoaPorId = AtualizarPessoaPorId;
