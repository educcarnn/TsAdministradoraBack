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
const AuthOrm_1 = require("../controllers/Auth/AuthOrm");
const ValidationStatusUser_1 = require("../middlewares/ValidationStatusUser");
const ValidationRoutes_1 = require("../middlewares/ValidationRoutes");
const AuthOrm_2 = require("../controllers/Auth/AuthOrm");
const router = express_1.default.Router();
// Clientes
router.post("/cadastrar-nova-pessoa-fisica", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, newCliente_1.CadastrarPessoa);
router.get("/obter-novas-pessoas", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, newCliente_1.ObterTodasPessoas);
router.get("/pessoa/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, newCliente_1.ObterPessoaPorId);
router.delete("/pessoa-delete/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, newCliente_1.DeletarPessoaPorId);
router.patch("/pessoa-patch/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, newCliente_1.AtualizarPessoaPorId);
//Juridica
router.post("/cadastrar-nova-pessoa-juridica", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, newClienteJuridica_1.CadastrarPessoaJuridica);
router.get("/obter-novas-pessoas-juridica", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, newClienteJuridica_1.ObterTodasPessoasJuridicas);
router.get("/pessoa-juridica/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, newClienteJuridica_1.ObterPessoaJuridicaPorId);
router.delete("/pessoa-juridica-delete/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, newClienteJuridica_1.DeletarPessoaJuridicaPorId);
router.patch("/pessoa-juridica-patch/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, newClienteJuridica_1.AtualizarPessoaJuridicaPorId);
// Rotas para Imóveis
router.post("/cadastro-imovel", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, imovelOrm_1.CadastrarImovel);
router.get("/obter-imoveis-novo", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, imovelOrm_1.ObterTodosImoveis);
router.get("/obter-imovel/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, imovelOrm_1.ObterImovelPorId);
router.delete("/imovel-delete/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, imovelOrm_1.ExcluirImovel);
router.patch("/imovel-patch/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, imovelOrm_1.AtualizarImovel);
// Rotas para Contratos
router.post("/cadastro-contrato", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, contratoOrm_1.CadastrarContrato);
router.get("/obter-contratos-novo", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, contratoOrm_1.ObterTodosContratos);
router.get("/obter-contrato/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdminOuUser, contratoOrm_1.ObterContratoPorId);
router.delete("/contrato-delete/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, contratoOrm_1.ExcluirContrato);
router.patch("/contrato-patch/:id", ValidationRoutes_1.verifyAuth, ValidationStatusUser_1.verificarAdmin, contratoOrm_1.AtualizarContrato);
// User
router.post("/users/invite-admin", AuthOrm_2.inviteAdmin);
router.post("/admin/register", AuthOrm_1.registerUser);
router.post("/users/login", AuthOrm_1.loginUser);
router.put("/users/:id", AuthOrm_1.updateUser);
router.delete("/users/:id", AuthOrm_1.deleteUser);
/*
    router.post('/login', Login)

  */
exports.default = router;
