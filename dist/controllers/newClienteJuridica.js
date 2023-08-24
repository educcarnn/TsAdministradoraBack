"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObterPessoaJuridicaPorId = exports.AtualizarPessoaJuridicaPorId = exports.DeletarPessoaJuridicaPorId = exports.ObterTodasPessoasJuridicas = exports.CadastrarPessoaJuridica = void 0;
const pessoaJuridica_1 = require("../services/pessoaJuridica");
const CadastrarPessoaJuridica = async (req, res) => {
    const data = req.body;
    try {
        await (0, pessoaJuridica_1.cadastrarPessoaJuridica)(data);
        return res.status(201).json({ message: 'Pessoa jurídica cadastrada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao cadastrar Pessoa Jurídica:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar Pessoa Jurídica' });
    }
};
exports.CadastrarPessoaJuridica = CadastrarPessoaJuridica;
const ObterTodasPessoasJuridicas = async (_req, res) => {
    try {
        const pessoasJuridicas = await (0, pessoaJuridica_1.obterTodasPessoasJuridicas)();
        return res.status(200).json(pessoasJuridicas);
    }
    catch (error) {
        console.error('Erro ao obter todas as Pessoas Jurídicas:', error);
        return res.status(500).json({ message: 'Erro ao obter todas as Pessoas Jurídicas' });
    }
};
exports.ObterTodasPessoasJuridicas = ObterTodasPessoasJuridicas;
const DeletarPessoaJuridicaPorId = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await (0, pessoaJuridica_1.deletarPessoaJuridicaPorId)(id);
        return res.status(200).json({ message: 'Pessoa jurídica deletada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao deletar Pessoa Jurídica por ID:', error);
        return res.status(500).json({ message: 'Erro ao deletar Pessoa Jurídica por ID' });
    }
};
exports.DeletarPessoaJuridicaPorId = DeletarPessoaJuridicaPorId;
const AtualizarPessoaJuridicaPorId = async (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    try {
        await (0, pessoaJuridica_1.atualizarPessoaJuridicaPorId)(id, data);
        return res.status(200).json({ message: 'Pessoa jurídica atualizada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao atualizar Pessoa Jurídica por ID:', error);
        return res.status(500).json({ message: 'Erro ao atualizar Pessoa Jurídica por ID' });
    }
};
exports.AtualizarPessoaJuridicaPorId = AtualizarPessoaJuridicaPorId;
const ObterPessoaJuridicaPorId = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const pessoaJuridica = await (0, pessoaJuridica_1.obterPessoaJuridicaPorId)(id);
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
};
exports.ObterPessoaJuridicaPorId = ObterPessoaJuridicaPorId;