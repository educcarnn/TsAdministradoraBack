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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarPessoaPorId = exports.deletarPessoaPorId = exports.obterPessoaPorId = exports.obterTodasPessoas = exports.checkPassword = exports.hashPassword = exports.findPessoaByEmail = exports.requeryPessoas = exports.cadastrarPessoa = exports.PessoaRepository = void 0;
const pessoaFisica_1 = require("../entities/pessoaFisica");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailUtils_1 = require("../utils/emailUtils");
const user_1 = require("./user");
exports.PessoaRepository = data_source_1.AppDataSource.getRepository(pessoaFisica_1.Pessoa);
const cadastrarPessoa = (pessoaData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!pessoaData.email) {
        throw new Error("E-mail não fornecido.");
    }
    const emailInUse = yield (0, emailUtils_1.isEmailInUse)(pessoaData.email);
    if (emailInUse) {
        throw new Error("E-mail já registrado em User ou Pessoa.");
    }
    if (!pessoaData.password) {
        throw new Error("Senha não fornecida.");
    }
    pessoaData.password = yield (0, exports.hashPassword)(pessoaData.password);
    const novaPessoa = exports.PessoaRepository.create(pessoaData);
    yield exports.PessoaRepository.save(novaPessoa);
    return novaPessoa;
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
const findPessoaByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userWithEmail = yield user_1.userRepository.findOne({ where: { email: email } });
    if (userWithEmail) {
        // Se o e-mail estiver registrado na tabela de User, retornamos null
        return null;
    }
    return yield exports.PessoaRepository.findOne({ where: { email: email } });
});
exports.findPessoaByEmail = findPessoaByEmail;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return bcrypt_1.default.hash(password, saltRounds);
});
exports.hashPassword = hashPassword;
const checkPassword = (inputPassword, storedPasswordHash) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(inputPassword, storedPasswordHash);
});
exports.checkPassword = checkPassword;
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
