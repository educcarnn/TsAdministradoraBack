"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarPessoaPorId = exports.deletarPessoaPorId = exports.obterPessoaPorId = exports.obterTodasPessoas = exports.requeryPessoas = exports.cadastrarPessoa = exports.PessoaRepository = void 0;
const pessoaFisica_1 = require("../entities/pessoaFisica");
const data_source_1 = require("../data-source");
exports.PessoaRepository = data_source_1.AppDataSource.getRepository(pessoaFisica_1.Pessoa);
const cadastrarPessoa = async (data) => {
    await exports.PessoaRepository.save(data);
};
exports.cadastrarPessoa = cadastrarPessoa;
const requeryPessoas = async () => {
    const requery = await exports.PessoaRepository.find({
        relations: {
            imoveisProprietarios: true,
            contratosProprietarios: true,
            contratosInquilinos: true,
        },
    });
    return requery;
};
exports.requeryPessoas = requeryPessoas;
const obterTodasPessoas = async () => {
    return exports.PessoaRepository.find();
};
exports.obterTodasPessoas = obterTodasPessoas;
const obterPessoaPorId = async (id) => {
    try {
        const getPessoa = await (0, exports.requeryPessoas)();
        const pessoa = await exports.PessoaRepository.findOne({ where: { id: id } });
        if (pessoa) {
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
};
exports.obterPessoaPorId = obterPessoaPorId;
const deletarPessoaPorId = async (id) => {
    await exports.PessoaRepository.delete(id);
};
exports.deletarPessoaPorId = deletarPessoaPorId;
const atualizarPessoaPorId = async (id, data) => {
    await exports.PessoaRepository.update(id, data);
};
exports.atualizarPessoaPorId = atualizarPessoaPorId;
