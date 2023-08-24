"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarContratoPorId = exports.deletarContratoPorId = exports.obterContratoPorId = exports.obterTodosContratos = exports.getContratos = exports.cadastrarContrato = void 0;
const contrato_1 = require("../entities/contrato");
const data_source_1 = require("../data-source");
const pessoaFisica_1 = require("./pessoaFisica");
const imovel_1 = require("../entities/imovel");
const ContratoRepository = data_source_1.AppDataSource.getRepository(contrato_1.Contrato);
const ImovelRepository = data_source_1.AppDataSource.getRepository(imovel_1.RegistroImovel);
const cadastrarContrato = async (data, inquilinoId, proprietarioId, imovelId) => {
    const contratoRepository = data_source_1.AppDataSource.getRepository(contrato_1.Contrato);
    const inquilino = await pessoaFisica_1.PessoaRepository.findOne({
        where: { id: inquilinoId },
    });
    if (!inquilino) {
        throw new Error("Inquilino (locatário) não encontrado");
    }
    const proprietario = await pessoaFisica_1.PessoaRepository.findOne({
        where: { id: proprietarioId },
    });
    if (!proprietario) {
        throw new Error("Proprietário não encontrado");
    }
    const imovel = await ImovelRepository.findOne({
        where: { id: imovelId },
    });
    if (!imovel) {
        throw new Error("Imóvel não encontrado");
    }
    const contrato = contratoRepository.create(data);
    contrato.inquilino = inquilino;
    contrato.proprietario = proprietario;
    contrato.imovel = imovel;
    await contratoRepository.save(contrato);
    return contrato;
};
exports.cadastrarContrato = cadastrarContrato;
const getContratos = async () => {
    const imoveisComPessoas = await ContratoRepository.find({
        relations: {
            inquilino: true,
            imovel: true,
            proprietario: true,
        },
    });
    return imoveisComPessoas;
};
exports.getContratos = getContratos;
const obterTodosContratos = async () => {
    return ContratoRepository.find();
};
exports.obterTodosContratos = obterTodosContratos;
const obterContratoPorId = async (id) => {
    try {
        const getContrato = await (0, exports.getContratos)();
        const contrato = await ContratoRepository.findOne({ where: { id: id } });
        if (contrato) {
            const contratoFind = getContrato.find(item => item.id === contrato.id);
            if (contratoFind) {
                return contratoFind;
            }
        }
        return undefined;
    }
    catch (error) {
        console.error('Erro ao obter Contrato por ID:', error);
        return undefined;
    }
};
exports.obterContratoPorId = obterContratoPorId;
const deletarContratoPorId = async (id) => {
    await ContratoRepository.delete(id);
};
exports.deletarContratoPorId = deletarContratoPorId;
const atualizarContratoPorId = async (id, data) => {
    await ContratoRepository.update(id, data);
};
exports.atualizarContratoPorId = atualizarContratoPorId;
