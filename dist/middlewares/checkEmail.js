"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
const emailsCadastrados = ['educcarnn@gmail.com', 'tiagorsardinha@gmail.com'];
function checkEmail(req, res, next) {
    const { email } = req.body;
    if (emailsCadastrados.includes(email)) {
        // Se o e-mail estiver cadastrado, chame a próxima função no pipeline de middleware
        next();
    }
    else {
        // Se o e-mail não estiver cadastrado, retorne uma resposta de erro
        res.status(401).json({ error: 'Acesso não autorizado. E-mail não cadastrado.' });
    }
}
exports.checkEmail = checkEmail;
