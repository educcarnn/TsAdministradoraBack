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
exports.atualizarContratoPorId = exports.deletarContratoPorId = exports.obterContratoPorId = exports.obterTodosContratos = exports.getContratos = exports.cadastrarContrato = void 0;
const contrato_1 = require("../entities/contrato");
const data_source_1 = require("../data-source"); // Certifique-se de importar o dataSource correto
const pessoaFisica_1 = require("./pessoaFisica");
const imovel_1 = require("../entities/imovel");
const contratoInquilino_1 = require("../entities/relations/contratoInquilino");
const ContratoRepository = data_source_1.AppDataSource.getRepository(contrato_1.Contrato);
const ImovelRepository = data_source_1.AppDataSource.getRepository(imovel_1.RegistroImovel);
const cadastrarContrato = (data, inquilinosData, // Opcional
proprietarioId, // Opcional
imovelId // Opcional
) => __awaiter(void 0, void 0, void 0, function* () {
    const contratoRepository = data_source_1.AppDataSource.getRepository(contrato_1.Contrato);
    const contratoInquilinoRepository = data_source_1.AppDataSource.getRepository(contratoInquilino_1.ContratoInquilino);
    if (!inquilinosData || !Array.isArray(inquilinosData) || inquilinosData.length === 0) {
        throw new Error("Dados dos inquilinos inválidos ou não fornecidos");
    }
    if (!proprietarioId) {
        throw new Error("ID do proprietário não fornecido");
    }
    if (!imovelId) {
        throw new Error("ID do imóvel não fornecido");
    }
    const inquilinosIds = inquilinosData.map(i => i.id);
    const inquilinos = yield pessoaFisica_1.PessoaRepository.findByIds(inquilinosIds);
    const proprietario = yield pessoaFisica_1.PessoaRepository.findOne({
        where: { id: proprietarioId },
    });
    if (!proprietario) {
        throw new Error("Proprietário não encontrado");
    }
    const imovel = yield ImovelRepository.findOne({
        where: { id: imovelId },
    });
    if (!imovel) {
        throw new Error("Imóvel não encontrado");
    }
    const contrato = contratoRepository.create(data);
    yield contratoRepository.save(contrato); // Salve o contrato primeiro para obter um ID
    for (const inquilinoData of inquilinosData) {
        const inquilino = inquilinos.find(i => i.id === inquilinoData.id);
        if (!inquilino) {
            throw new Error(`Inquilino com ID ${inquilinoData.id} não encontrado.`);
        }
        const contratoInquilino = contratoInquilinoRepository.create({
            inquilino: inquilino,
            contrato: contrato,
            percentual: inquilinoData.percentual
        });
        yield contratoInquilinoRepository.save(contratoInquilino);
    }
    contrato.proprietario = proprietario;
    contrato.imovel = imovel;
    return contrato;
});
exports.cadastrarContrato = cadastrarContrato;
const getContratos = () => __awaiter(void 0, void 0, void 0, function* () {
    const imoveisComPessoas = yield ContratoRepository.find({
        relations: {
            inquilinos: true,
            imovel: true,
            proprietario: true,
        },
    });
    return imoveisComPessoas;
});
exports.getContratos = getContratos;
const obterTodosContratos = () => __awaiter(void 0, void 0, void 0, function* () {
    return ContratoRepository.find();
});
exports.obterTodosContratos = obterTodosContratos;
const obterContratoPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getContrato = yield (0, exports.getContratos)();
        const contrato = yield ContratoRepository.findOne({ where: { id: id } });
        if (contrato) {
            // Procura o imóvel nas informações carregadas
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
});
exports.obterContratoPorId = obterContratoPorId;
const deletarContratoPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield ContratoRepository.delete(id);
});
exports.deletarContratoPorId = deletarContratoPorId;
const atualizarContratoPorId = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield ContratoRepository.update(id, data);
});
exports.atualizarContratoPorId = atualizarContratoPorId;
