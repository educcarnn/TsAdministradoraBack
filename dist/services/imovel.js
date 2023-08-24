"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarImovelPorId = exports.atualizarImovelPorId = exports.obterImovelPorId = exports.obterTodosImoveis = exports.getImoveisComPessoas = exports.cadastrarImovel = void 0;
const imovel_1 = require("../entities/imovel");
const pessoaFisica_1 = require("../entities/pessoaFisica");
const data_source_1 = require("../data-source");
const ImovelRepository = data_source_1.AppDataSource.getRepository(imovel_1.RegistroImovel);
data_source_1.AppDataSource.getRepository(pessoaFisica_1.Pessoa);
const pessoaRepository = data_source_1.AppDataSource.getRepository(pessoaFisica_1.Pessoa);
const imovelRepository = data_source_1.AppDataSource.getRepository(imovel_1.RegistroImovel);
const cadastrarImovel = async (imovelData, pessoaId) => {
    const pessoa = await pessoaRepository.findOne({ where: { id: pessoaId } });
    if (!pessoa) {
        throw new Error("Pessoa não encontrada");
    }
    const novoImovel = imovelRepository.create({
        ...imovelData,
        proprietario: pessoa
    });
    await imovelRepository.save(novoImovel);
    return novoImovel;
};
exports.cadastrarImovel = cadastrarImovel;
const getImoveisComPessoas = async () => {
    const imoveisComPessoas = await imovelRepository.find({
        relations: {
            proprietario: true,
            contratos: true,
        },
    });
    return imoveisComPessoas;
};
exports.getImoveisComPessoas = getImoveisComPessoas;
const obterTodosImoveis = async () => {
    return ImovelRepository.find();
};
exports.obterTodosImoveis = obterTodosImoveis;
const obterImovelPorId = async (id) => {
    try {
        const imoveisComPessoas = await (0, exports.getImoveisComPessoas)();
        const imovel = await ImovelRepository.findOne({ where: { id: id } });
        if (imovel) {
            const imovelEncontrado = imoveisComPessoas.find(item => item.id === imovel.id);
            if (imovelEncontrado) {
                return imovelEncontrado;
            }
        }
        return undefined;
    }
    catch (error) {
        console.error('Erro ao obter Imóvel por ID:', error);
        return undefined;
    }
};
exports.obterImovelPorId = obterImovelPorId;
const atualizarImovelPorId = async (id, data) => {
    const imovel = await ImovelRepository.findOne({ where: { id: id } });
    if (imovel) {
        Object.assign(imovel, data);
        await ImovelRepository.save(imovel);
    }
};
exports.atualizarImovelPorId = atualizarImovelPorId;
const deletarImovelPorId = async (id) => {
    const imovel = await ImovelRepository.findOne({ where: { id: id } });
    if (imovel) {
        await ImovelRepository.remove(imovel);
    }
};
exports.deletarImovelPorId = deletarImovelPorId;
