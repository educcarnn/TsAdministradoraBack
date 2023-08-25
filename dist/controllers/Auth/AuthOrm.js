"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const UserService = __importStar(require("../../services/user")); // Ajuste o caminho conforme necessário
const jwt = __importStar(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield UserService.createUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro no registro' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserService.findUserByEmail(req.body.email);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        const isValidPassword = yield UserService.checkPassword(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Senha incorreta." });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login bem-sucedido!", token: token, role: user.role });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro no login' });
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10); // Convertendo para número
        if (isNaN(userId)) {
            return res.status(400).json({ message: "ID do usuário inválido." });
        }
        yield UserService.updateUserById(userId, req.body);
        res.status(200).json({ message: "Usuário atualizado com sucesso." });
    }
    catch (error) {
        res.status(400).json({ message: "Erro ao atualizar usuário" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        yield UserService.deleteUserById(id);
        res.status(200).json({ message: "Usuário deletado com sucesso." });
    }
    catch (error) {
        res.status(400).json({ message: "Erro ao deletar usuário" });
    }
});
exports.deleteUser = deleteUser;
