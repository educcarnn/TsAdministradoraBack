"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarPessoaJuridicaPorId = exports.atualizarPessoaJuridicaPorId = exports.obterPessoaJuridicaPorId = exports.obterTodasPessoasJuridicas = exports.cadastrarPessoaJuridica = void 0;
const pessoaJuridica_1 = require("../entities/pessoaJuridica");
const data_source_1 = require("../data-source");
const PessoaJuridicaRepository = data_source_1.AppDataSource.getRepository(pessoaJuridica_1.PessoaJuridica);
const cadastrarPessoaJuridica = async (data) => {
    await PessoaJuridicaRepository.save(data);
};
exports.cadastrarPessoaJuridica = cadastrarPessoaJuridica;
const obterTodasPessoasJuridicas = async () => {
    return PessoaJuridicaRepository.find();
};
exports.obterTodasPessoasJuridicas = obterTodasPessoasJuridicas;
const obterPessoaJuridicaPorId = async (id) => {
    const pessoaJuridica = await PessoaJuridicaRepository.findOne({ where: { id: id } });
    return pessoaJuridica || undefined;
};
exports.obterPessoaJuridicaPorId = obterPessoaJuridicaPorId;
const atualizarPessoaJuridicaPorId = async (id, data) => {
    return await PessoaJuridicaRepository.update(id, data);
};
exports.atualizarPessoaJuridicaPorId = atualizarPessoaJuridicaPorId;
const deletarPessoaJuridicaPorId = async (id) => {
    return await PessoaJuridicaRepository.delete(id);
};
exports.deletarPessoaJuridicaPorId = deletarPessoaJuridicaPorId;
