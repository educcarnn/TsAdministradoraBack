"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newCliente_1 = require("../controllers/newCliente");
const newClienteJuridica_1 = require("../controllers/newClienteJuridica");
const imovelOrm_1 = require("../controllers/imovelOrm");
const contratoOrm_1 = require("../controllers/contratoOrm");
//import { Login } from '../controllers/Auth/auth';
const router = express_1.default.Router();
// Clientes
router.post('/cadastrar-nova-pessoa-fisica', newCliente_1.CadastrarPessoa);
router.get('/obter-novas-pessoas', newCliente_1.ObterTodasPessoas);
router.get('/pessoa/:id', newCliente_1.ObterPessoaPorId);
router.delete('/pessoa-delete/:id', newCliente_1.DeletarPessoaPorId);
router.patch('/pessoa-patch/:id', newCliente_1.AtualizarPessoaPorId);
//Juridica
router.post('/cadastrar-nova-pessoa-juridica', newClienteJuridica_1.CadastrarPessoaJuridica);
router.get('/obter-novas-pessoas-juridica', newClienteJuridica_1.ObterTodasPessoasJuridicas);
router.get('/pessoa-juridica/:id', newClienteJuridica_1.ObterPessoaJuridicaPorId);
router.delete('/pessoa-juridica-delete/:id', newClienteJuridica_1.DeletarPessoaJuridicaPorId);
router.patch('/pessoa-juridica-patch/:id', newClienteJuridica_1.AtualizarPessoaJuridicaPorId);
// Rotas para Imóveis
router.post('/cadastro-imovel', imovelOrm_1.CadastrarImovel);
router.get('/obter-imoveis-novo', imovelOrm_1.ObterTodosImoveis);
router.get('/obter-imovel/:id', imovelOrm_1.ObterImovelPorId);
router.delete('/imovel-delete/:id', imovelOrm_1.ExcluirImovel);
router.patch('/imovel-patch/:id', imovelOrm_1.AtualizarImovel);
// Rotas para Contratos
router.post('/cadastro-contrato', contratoOrm_1.CadastrarContrato);
router.get('/obter-contratos-novo', contratoOrm_1.ObterTodosContratos);
router.get('/obter-contrato/:id', contratoOrm_1.ObterContratoPorId);
router.delete('/contrato-delete/:id', contratoOrm_1.ExcluirContrato);
router.patch('/contrato-patch/:id', contratoOrm_1.AtualizarContrato);
// User
/*
    router.post('/login', Login)

  */
exports.default = router;
