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
const AuthOrm_2 = require("../controllers/Auth/AuthOrm");
const isAuth_1 = require("../middlewares/isAuth");
const ValidationStatusUser_1 = require("../middlewares/ValidationStatusUser");
const router = express_1.default.Router();
// Clientes
router.post("/cadastrar-nova-pessoa-fisica", newCliente_1.CadastrarPessoa);
router.get("/obter-novas-pessoas", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdmin, newCliente_1.ObterTodasPessoas);
router.get("/pessoa/:id", newCliente_1.ObterPessoaPorId);
router.delete("/pessoa-delete/:id", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdmin, newCliente_1.DeletarPessoaPorId);
router.patch("/pessoa-patch/:id", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdminOuUser, newCliente_1.AtualizarPessoaPorId);
//Juridica
router.post("/cadastrar-nova-pessoa-juridica", newClienteJuridica_1.CadastrarPessoaJuridica);
router.get("/obter-novas-pessoas-juridica", newClienteJuridica_1.ObterTodasPessoasJuridicas);
router.get("/pessoa-juridica/:id", newClienteJuridica_1.ObterPessoaJuridicaPorId);
router.delete("/pessoa-juridica-delete/:id", newClienteJuridica_1.DeletarPessoaJuridicaPorId);
router.patch("/pessoa-juridica-patch/:id", newClienteJuridica_1.AtualizarPessoaJuridicaPorId);
// Rotas para Imóveis
router.post("/cadastro-imovel", imovelOrm_1.CadastrarImovel);
router.get("/obter-imoveis-novo", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdmin, imovelOrm_1.ObterTodosImoveis);
router.get("/obter-imovel/:id", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdminOuUser, imovelOrm_1.ObterImovelPorId);
router.delete("/imovel-delete/:id", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdmin, imovelOrm_1.ExcluirImovel);
router.patch("/imovel-patch/:id", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdminOuUser, imovelOrm_1.AtualizarImovel);
// Rotas para Contratos
router.post("/cadastro-contrato", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdmin, contratoOrm_1.CadastrarContrato);
router.get("/obter-contratos-novo", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdmin, contratoOrm_1.ObterTodosContratos);
router.get("/obter-contrato/:id", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdminOuUser, contratoOrm_1.ObterContratoPorId);
router.delete("/contrato-delete/:id", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdmin, contratoOrm_1.ExcluirContrato);
router.patch("/contrato-patch/:id", isAuth_1.isAuthenticated, ValidationStatusUser_1.isAdmin, contratoOrm_1.AtualizarContrato);
// User
router.post("/users/invite-admin", AuthOrm_2.inviteAdmin);
router.post("/admin/register", AuthOrm_1.registerUser);
router.post("/users/login", AuthOrm_1.loginUser);
router.patch("/users/:id", AuthOrm_1.updateUser);
router.delete("/users/:id", AuthOrm_1.deleteUser);
exports.default = router;
