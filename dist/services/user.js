"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.checkPassword = exports.hashPassword = exports.findUserByEmail = exports.createUser = void 0;
const user_1 = require("../entities/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
const createUser = async (userData) => {
    if (!userData.email) {
        throw new Error("E-mail não fornecido.");
    }
    const userExists = await userRepository.findOne({ where: { email: userData.email } });
    if (userExists) {
        throw new Error("E-mail já registrado.");
    }
    if (!userData.password) {
        throw new Error("Senha não fornecida.");
    }
    userData.password = await (0, exports.hashPassword)(userData.password);
    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
    return newUser;
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    const user = await userRepository.findOne({ where: { email: email } });
    return user || undefined;
};
exports.findUserByEmail = findUserByEmail;
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
const checkPassword = async (inputPassword, storedPasswordHash) => {
    return bcrypt_1.default.compare(inputPassword, storedPasswordHash);
};
exports.checkPassword = checkPassword;
const updateUserById = async (id, data) => {
    const user = await userRepository.findOne({ where: { id: id } });
    if (!user) {
        throw new Error("Usuário não encontrado.");
    }
    if (data.password) {
        data.password = await (0, exports.hashPassword)(data.password);
    }
    Object.assign(user, data);
    await userRepository.save(user);
};
exports.updateUserById = updateUserById;
const deleteUserById = async (id) => {
    const user = await userRepository.findOne({ where: { id: id } });
    if (!user) {
        throw new Error("Usuário não encontrado.");
    }
    await userRepository.remove(user);
};
exports.deleteUserById = deleteUserById;
