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
const ContratoRepository = data_source_1.AppDataSource.getRepository(contrato_1.Contrato);
const ImovelRepository = data_source_1.AppDataSource.getRepository(imovel_1.RegistroImovel);
const cadastrarContrato = (data, inquilinoId, proprietarioId, imovelId) => __awaiter(void 0, void 0, void 0, function* () {
    const contratoRepository = data_source_1.AppDataSource.getRepository(contrato_1.Contrato);
    const inquilino = yield pessoaFisica_1.PessoaRepository.findOne({
        where: { id: inquilinoId },
    });
    if (!inquilino) {
        throw new Error("Inquilino (locatário) não encontrado");
    }
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
    contrato.inquilino = inquilino; // Associe o inquilino ao contrato
    contrato.proprietario = proprietario; // Associe o proprietário ao contrato
    contrato.imovel = imovel; // Associe o imóvel ao contrato
    yield contratoRepository.save(contrato);
    // Como as relações são `ManyToOne`, você não precisa atualizar os arrays de contratos dos objetos `inquilino` e `proprietario`
    // O TypeORM se encarregará de atualizar os IDs estrangeiros no contrato
    return contrato;
});
exports.cadastrarContrato = cadastrarContrato;
const getContratos = () => __awaiter(void 0, void 0, void 0, function* () {
    const imoveisComPessoas = yield ContratoRepository.find({
        relations: {
            inquilino: true,
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
