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
exports.deletarImovelPorId = exports.atualizarImovelPorId = exports.obterImovelPorId = exports.obterTodosImoveis = exports.getImoveisComPessoas = exports.cadastrarImovel = void 0;
const imovel_1 = require("../entities/imovel");
const pessoaFisica_1 = require("../entities/pessoaFisica");
const data_source_1 = require("../data-source");
const proprietarioImovel_1 = require("../entities/relations/proprietarioImovel");
const ImovelRepository = data_source_1.AppDataSource.getRepository(imovel_1.RegistroImovel);
data_source_1.AppDataSource.getRepository(pessoaFisica_1.Pessoa); // Adicione o repositório da entidade Pessoa
const pessoaRepository = data_source_1.AppDataSource.getRepository(pessoaFisica_1.Pessoa);
const imovelRepository = data_source_1.AppDataSource.getRepository(imovel_1.RegistroImovel);
const proprietarioImovelRepository = data_source_1.AppDataSource.getRepository(proprietarioImovel_1.ProprietarioImovel);
const cadastrarImovel = (imovelData, proprietariosData) => __awaiter(void 0, void 0, void 0, function* () {
    // Salve o novo imóvel no banco de dados
    const savedImovel = yield imovelRepository.save(imovelData);
    for (const propData of proprietariosData) {
        const pessoa = yield pessoaRepository.findOne({ where: { id: propData.id } });
        if (!pessoa) {
            throw new Error(`Pessoa com ID ${propData.id} não encontrada`);
        }
        const proprietarioImovel = new proprietarioImovel_1.ProprietarioImovel();
        proprietarioImovel.pessoa = pessoa;
        proprietarioImovel.registroImovel = savedImovel;
        proprietarioImovel.percentualPropriedade = propData.percentual;
        yield proprietarioImovelRepository.save(proprietarioImovel);
    }
    return savedImovel;
});
exports.cadastrarImovel = cadastrarImovel;
const getImoveisComPessoas = () => __awaiter(void 0, void 0, void 0, function* () {
    const imoveisComPessoas = yield imovelRepository.find({
        relations: {
            imoveisProprietarios: true,
            contratos: true,
        },
    });
    return imoveisComPessoas;
});
exports.getImoveisComPessoas = getImoveisComPessoas;
const obterTodosImoveis = () => __awaiter(void 0, void 0, void 0, function* () {
    return ImovelRepository.find();
});
exports.obterTodosImoveis = obterTodosImoveis;
const obterImovelPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imoveisComPessoas = yield (0, exports.getImoveisComPessoas)(); // Carrega informações de pessoas relacionadas aos imóveis
        const imovel = yield ImovelRepository.findOne({ where: { id: id } });
        if (imovel) {
            // Procura o imóvel nas informações carregadas
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
});
exports.obterImovelPorId = obterImovelPorId;
const atualizarImovelPorId = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const imovel = yield ImovelRepository.findOne({ where: { id: id } });
    if (imovel) {
        Object.assign(imovel, data);
        yield ImovelRepository.save(imovel);
    }
});
exports.atualizarImovelPorId = atualizarImovelPorId;
const deletarImovelPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const imovel = yield ImovelRepository.findOne({ where: { id: id } });
    if (imovel) {
        yield ImovelRepository.remove(imovel);
    }
});
exports.deletarImovelPorId = deletarImovelPorId;
