"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    // Extrai o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ message: "Não autenticado. Token não fornecido." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // armazene o userId no objeto req para uso posterior
        req.role = decoded.role; // armazene a role no objeto req para uso posterior
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido ou expirado." });
    }
};
exports.isAuthenticated = isAuthenticated;
