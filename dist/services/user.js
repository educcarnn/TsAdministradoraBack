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
exports.createInvite = exports.deleteUserById = exports.updateUserById = exports.checkPassword = exports.hashPassword = exports.findUserByEmail = exports.createUser = exports.userRepository = void 0;
const user_1 = require("../entities/user"); // Ajuste o caminho conforme necessário
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailUtils_1 = require("../../src/utils/emailUtils");
const pessoaFisica_1 = require("./pessoaFisica");
exports.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userData.email) {
        throw new Error("E-mail não fornecido.");
    }
    const emailInUse = yield (0, emailUtils_1.isEmailInUse)(userData.email);
    if (emailInUse) {
        throw new Error("E-mail já registrado em User ou Pessoa.");
    }
    // Certifique-se de que userData.password esteja definido antes de tentar hasheá-lo
    if (!userData.password) {
        throw new Error("Senha não fornecida.");
    }
    userData.password = yield (0, exports.hashPassword)(userData.password);
    const newUser = exports.userRepository.create(userData);
    yield exports.userRepository.save(newUser);
    return newUser;
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.userRepository.findOne({ where: { email: email } });
    const pessoa = yield pessoaFisica_1.PessoaRepository.findOne({ where: { email: email } });
    return user || pessoa || undefined;
});
exports.findUserByEmail = findUserByEmail;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return bcrypt_1.default.hash(password, saltRounds);
});
exports.hashPassword = hashPassword;
const checkPassword = (inputPassword, storedPasswordHash) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(inputPassword, storedPasswordHash);
});
exports.checkPassword = checkPassword;
const updateUserById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.userRepository.findOne({ where: { id: id } });
    if (!user) {
        throw new Error("Usuário não encontrado.");
    }
    if (data.password) {
        data.password = yield (0, exports.hashPassword)(data.password);
    }
    Object.assign(user, data);
    yield exports.userRepository.save(user);
});
exports.updateUserById = updateUserById;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.userRepository.findOne({ where: { id: id } });
    if (!user) {
        throw new Error("Usuário não encontrado.");
    }
    yield exports.userRepository.remove(user);
});
exports.deleteUserById = deleteUserById;
const createInvite = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    // Neste caso, não estamos salvando a senha, pois a ideia é que o usuário defina a senha quando aceitar o convite.
    const user = new user_1.User();
    user.email = userData.email;
    user.role = userData.role || "user";
    yield userRepository.save(user);
    return user;
});
exports.createInvite = createInvite;
