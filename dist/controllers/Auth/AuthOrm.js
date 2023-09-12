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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = exports.inviteAdmin = void 0;
const UserService = __importStar(require("../../services/user"));
const PessoaService = __importStar(require("../../services/pessoaFisica")); // Ajuste o caminho conforme necessário
const jwt = __importStar(require("jsonwebtoken"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const user_1 = require("../../services/user");
const user_2 = require("../../entities/user");
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY || "");
const inviteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newInvite = yield (0, user_1.createInvite)(req.body);
        const token = jwt.sign({ userId: newInvite.id, role: newInvite.role }, process.env.JWT_SECRET, { expiresIn: "3h" });
        const baseActivationURL = newInvite.role === "admin"
            ? "https://tsadministradora.com.br/invite-admin"
            : "https://tsadministradora.com.br/clientes-pessoa-fisica";
        const activationLink = `${baseActivationURL}?token=${token}`;
        const msg = {
            to: newInvite.email,
            from: "tsadmsistema@gmail.com",
            subject: "Ative sua conta - Ts Administradora",
            text: `Olá! Ative sua conta e defina sua senha clicando no seguinte link: ${activationLink}`,
            html: `<p>Olá! Ative sua conta e defina sua senha clicando no seguinte <a href="${activationLink}">link</a>. A partir do momento que foi enviado o link terá 3 horas de acesso, passado esse horário, só poderá ser feito o cadastro mediante a reenvio</p>`,
        };
        yield mail_1.default.send(msg);
        res.status(201).json({ message: "Convite enviado!" });
    }
    catch (error) {
        console.error("Erro detalhado:", error);
        if (error.message === "Role desconhecida") {
            res.status(400).json({ message: "Role desconhecida" });
        }
        else {
            res
                .status(400)
                .json({ message: "E-mail em uso ou falha ao enviar o convite" });
        }
    }
});
exports.inviteAdmin = inviteAdmin;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield UserService.createUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: "E-mail em uso" });
    }
});
exports.registerUser = registerUser;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user;
        user = yield UserService.findUserByEmail(req.body.email);
        if (!user) {
            user = yield PessoaService.findPessoaByEmail(req.body.email);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
        }
        const isValidPassword = user instanceof user_2.User
            ? yield UserService.checkPassword(req.body.password, user.password)
            : yield PessoaService.checkPassword(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Senha incorreta." });
        }
        // Geração do token JWT
        const tokenExpiration = 24 * 60 * 60; // 24 horas em segundos
        const token = jwt.sign({
            userId: user.id,
            role: user.role || "user", // Se não tiver role, assume "user" para Pessoa
        }, process.env.JWT_SECRET, { expiresIn: tokenExpiration });
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + tokenExpiration);
        // Retornando o token, a role e a data de expiração no corpo da resposta
        res.status(200).json({
            message: "Login bem-sucedido!",
            token: token,
            role: user.role || "user",
            tokenExpiresAt: expirationDate,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Erro no login" });
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
