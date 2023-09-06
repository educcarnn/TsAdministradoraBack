"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminOuUser = exports.isAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role && decoded.role === "admin") {
            next();
        }
        else {
            res.status(403).json({ message: "Acesso negado. Permissão de admin necessária." });
        }
    }
    catch (err) {
        res.status(403).json({ message: "Token inválido." });
    }
};
exports.isAdmin = isAdmin;
const isAdminOuUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role && decoded.role === "admin" || decoded.role === "user") {
            next();
        }
        else {
            res.status(403).json({ message: "Acesso negado. Permissão de admin necessária." });
        }
    }
    catch (err) {
        res.status(403).json({ message: "Token inválido." });
    }
};
exports.isAdminOuUser = isAdminOuUser;
