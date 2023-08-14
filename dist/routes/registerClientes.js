"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteController_1 = require("../controllers/clienteController");
const imovelController_1 = require("../controllers/imovelController");
const router = express_1.default.Router();
// Rotas para Clientes
router.post('/clientes', clienteController_1.registrarCliente);
router.get('/clientes', clienteController_1.obterClientes);
// Rotas para Imóveis
router.post('/imoveis', imovelController_1.registrarImovel);
router.get('/imoveis', imovelController_1.obterImoveis);
exports.default = router;
