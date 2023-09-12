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
exports.deletarPessoaJuridicaPorId = exports.atualizarPessoaJuridicaPorId = exports.obterPessoaJuridicaPorId = exports.obterTodasPessoasJuridicas = exports.cadastrarPessoaJuridica = void 0;
const pessoaJuridica_1 = require("../entities/pessoaJuridica");
const data_source_1 = require("../data-source");
const PessoaJuridicaRepository = data_source_1.AppDataSource.getRepository(pessoaJuridica_1.PessoaJuridica);
const cadastrarPessoaJuridica = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield PessoaJuridicaRepository.save(data);
});
exports.cadastrarPessoaJuridica = cadastrarPessoaJuridica;
const obterTodasPessoasJuridicas = () => __awaiter(void 0, void 0, void 0, function* () {
    return PessoaJuridicaRepository.find();
});
exports.obterTodasPessoasJuridicas = obterTodasPessoasJuridicas;
const obterPessoaJuridicaPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pessoaJuridica = yield PessoaJuridicaRepository.findOne({ where: { id: id } });
    return pessoaJuridica || undefined;
});
exports.obterPessoaJuridicaPorId = obterPessoaJuridicaPorId;
const atualizarPessoaJuridicaPorId = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PessoaJuridicaRepository.update(id, data);
});
exports.atualizarPessoaJuridicaPorId = atualizarPessoaJuridicaPorId;
const deletarPessoaJuridicaPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PessoaJuridicaRepository.delete(id);
});
exports.deletarPessoaJuridicaPorId = deletarPessoaJuridicaPorId;
