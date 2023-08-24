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
exports.atualizarPessoaPorId = exports.deletarPessoaPorId = exports.obterPessoaPorId = exports.obterTodasPessoas = exports.requeryPessoas = exports.cadastrarPessoa = exports.PessoaRepository = void 0;
const pessoaFisica_1 = require("../entities/pessoaFisica");
const data_source_1 = require("../data-source");
exports.PessoaRepository = data_source_1.AppDataSource.getRepository(pessoaFisica_1.Pessoa);
const cadastrarPessoa = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.PessoaRepository.save(data);
});
exports.cadastrarPessoa = cadastrarPessoa;
const requeryPessoas = () => __awaiter(void 0, void 0, void 0, function* () {
    const requery = yield exports.PessoaRepository.find({
        relations: {
            imoveisProprietarios: true,
            contratosProprietarios: true,
            contratosInquilinos: true,
        },
    });
    return requery;
});
exports.requeryPessoas = requeryPessoas;
const obterTodasPessoas = () => __awaiter(void 0, void 0, void 0, function* () {
    return exports.PessoaRepository.find();
});
exports.obterTodasPessoas = obterTodasPessoas;
const obterPessoaPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPessoa = yield (0, exports.requeryPessoas)();
        const pessoa = yield exports.PessoaRepository.findOne({ where: { id: id } });
        if (pessoa) {
            // Procura a pessoa nas informações carregadas
            const pessoaFind = getPessoa.find(item => item.id === pessoa.id);
            if (pessoaFind) {
                return pessoaFind;
            }
        }
        return undefined;
    }
    catch (error) {
        console.error('Erro ao obter Pessoa por ID:', error);
        return undefined;
    }
});
exports.obterPessoaPorId = obterPessoaPorId;
const deletarPessoaPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.PessoaRepository.delete(id);
});
exports.deletarPessoaPorId = deletarPessoaPorId;
const atualizarPessoaPorId = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.PessoaRepository.update(id, data);
});
exports.atualizarPessoaPorId = atualizarPessoaPorId;
