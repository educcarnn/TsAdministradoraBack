"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationEmail = void 0;
const ValidationEmail = (req, res, next) => {
    const { email } = req.body;
    if (email) {
        next();
    }
    else {
        res.status(400).send("E-mail inválido");
    }
};
exports.ValidationEmail = ValidationEmail;
