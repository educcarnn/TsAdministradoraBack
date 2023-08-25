"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationStatusUser = void 0;
const ValidationStatusUser = (req, res, next) => {
    const user = req.user;
    if (user) {
        // Lógica de validação de status
        if (user.role !== "admin") {
            next();
        }
        else {
            res.status(401).send("Status inválido");
        }
    }
    else {
        res.status(401).send("Usuário não autenticado");
    }
};
exports.ValidationStatusUser = ValidationStatusUser;
