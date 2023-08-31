import express from "express";
import {
  AtualizarPessoaPorId,
  CadastrarPessoa,
  DeletarPessoaPorId,
  ObterPessoaPorId,
  ObterTodasPessoas,
} from "../controllers/newCliente";
import {
  CadastrarPessoaJuridica,
  ObterTodasPessoasJuridicas,
  ObterPessoaJuridicaPorId,
  AtualizarPessoaJuridicaPorId,
  DeletarPessoaJuridicaPorId,
} from "../controllers/newClienteJuridica";
import {
  CadastrarImovel,
  ObterTodosImoveis,
  ObterImovelPorId,
  ExcluirImovel,
  AtualizarImovel,
} from "../controllers/imovelOrm";
import {
  CadastrarContrato,
  ObterTodosContratos,
  ObterContratoPorId,
  ExcluirContrato,
  AtualizarContrato,
} from "../controllers/contratoOrm";
import {
  atualizarContratoPorId,
  obterContratoPorId,
} from "../services/contrato";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/Auth/AuthOrm";

import { inviteAdmin } from "../controllers/Auth/AuthOrm";
import { isAuthenticated } from "../middlewares/isAuth";
import { isAdmin, isAdminOuUser} from "../middlewares/ValidationStatusUser";

const router = express.Router();

// Clientes
router.post("/cadastrar-nova-pessoa-fisica", CadastrarPessoa);
router.get("/obter-novas-pessoas", isAuthenticated ,isAdmin, ObterTodasPessoas);
router.get("/pessoa/:id",  ObterPessoaPorId);
router.delete("/pessoa-delete/:id",  DeletarPessoaPorId);
router.patch("/pessoa-patch/:id", isAuthenticated, isAdminOuUser, AtualizarPessoaPorId);

//Juridica
router.post("/cadastrar-nova-pessoa-juridica",  CadastrarPessoaJuridica);
router.get("/obter-novas-pessoas-juridica",  ObterTodasPessoasJuridicas);
router.get("/pessoa-juridica/:id", ObterPessoaJuridicaPorId);
router.delete("/pessoa-juridica-delete/:id",DeletarPessoaJuridicaPorId);
router.patch("/pessoa-juridica-patch/:id",  AtualizarPessoaJuridicaPorId);

// Rotas para Imóveis
router.post("/cadastro-imovel",CadastrarImovel);
router.get("/obter-imoveis-novo", isAuthenticated ,isAdmin, ObterTodosImoveis);
router.get("/obter-imovel/:id",  ObterImovelPorId);
router.delete("/imovel-delete/:id",   ExcluirImovel);
router.patch("/imovel-patch/:id", AtualizarImovel);

// Rotas para Contratos
router.post("/cadastro-contrato", CadastrarContrato);
router.get("/obter-contratos-novo", isAuthenticated , isAdmin, ObterTodosContratos);
router.get("/obter-contrato/:id",  ObterContratoPorId);
router.delete("/contrato-delete/:id",   ExcluirContrato);
router.patch("/contrato-patch/:id",  AtualizarContrato);

// User
router.post("/users/invite-admin", inviteAdmin);
router.post("/admin/register", registerUser)
router.post("/users/login", loginUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

/*
    router.post('/login', Login)

  */
export default router;
