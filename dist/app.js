"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
// Lista dos domínios que você quer permitir
const origensPermitidas = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://tsadministradora.onrender.com',
    'https://tsadministradora.onrender.com',
    'https://tsadministradora.com.br',
    'http://tsadministradora.com.br',
    'n-git-main-educcarnn.vercel.app',
    'n-ba8lchbcb-educcarnn.vercel.app'
];
app.use((req, res, next) => {
    const origem = req.get('origin');
    if (origensPermitidas.includes(origem)) {
        res.setHeader('Access-Control-Allow-Origin', origem);
    }
    // Configura outros cabeçalhos CORS
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    next();
});
// Parseia o corpo das requisições JSON para objetos JavaScript
app.use(express_1.default.json());
// Usa as rotas definidas no arquivo routes
app.use('/', routes_1.default);
exports.default = app;
