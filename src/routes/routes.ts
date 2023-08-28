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
import { verificarAdminOuUser, verificarAdmin } from "../middlewares/ValidationStatusUser";
import {verifyAuth} from "../middlewares/ValidationRoutes"
import { inviteAdmin } from "../controllers/Auth/AuthOrm";

const router = express.Router();

// Clientes
router.post("/cadastrar-nova-pessoa-fisica", verifyAuth, verificarAdminOuUser, CadastrarPessoa);
router.get("/obter-novas-pessoas", verifyAuth, verificarAdmin, ObterTodasPessoas);
router.get("/pessoa/:id", verifyAuth, verificarAdminOuUser, ObterPessoaPorId);
router.delete("/pessoa-delete/:id",  verifyAuth, verificarAdmin, DeletarPessoaPorId);
router.patch("/pessoa-patch/:id", verifyAuth, verificarAdminOuUser, AtualizarPessoaPorId);

//Juridica
router.post("/cadastrar-nova-pessoa-juridica", verifyAuth, verificarAdminOuUser, CadastrarPessoaJuridica);
router.get("/obter-novas-pessoas-juridica",  verifyAuth, verificarAdmin, ObterTodasPessoasJuridicas);
router.get("/pessoa-juridica/:id",verifyAuth, verificarAdminOuUser, ObterPessoaJuridicaPorId);
router.delete("/pessoa-juridica-delete/:id", verifyAuth, verificarAdmin, DeletarPessoaJuridicaPorId);
router.patch("/pessoa-juridica-patch/:id", verifyAuth, verificarAdminOuUser, AtualizarPessoaJuridicaPorId);

// Rotas para Imóveis
router.post("/cadastro-imovel",verifyAuth, verificarAdminOuUser, CadastrarImovel);
router.get("/obter-imoveis-novo", verifyAuth, verificarAdmin, ObterTodosImoveis);
router.get("/obter-imovel/:id",  verifyAuth, verificarAdminOuUser, ObterImovelPorId);
router.delete("/imovel-delete/:id",  verifyAuth, verificarAdmin, ExcluirImovel);
router.patch("/imovel-patch/:id", verifyAuth, verificarAdminOuUser, AtualizarImovel);

// Rotas para Contratos
router.post("/cadastro-contrato",verifyAuth, verificarAdmin, CadastrarContrato);
router.get("/obter-contratos-novo", verifyAuth, verificarAdmin, ObterTodosContratos);
router.get("/obter-contrato/:id",  verifyAuth, verificarAdminOuUser, ObterContratoPorId);
router.delete("/contrato-delete/:id",  verifyAuth, verificarAdmin, ExcluirContrato);
router.patch("/contrato-patch/:id", verifyAuth, verificarAdmin, AtualizarContrato);

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
