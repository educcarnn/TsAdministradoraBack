import express from "express";
import {
  AtualizarPessoaPorId,
  CadastrarPessoa,
  DeletarPessoaPorId,
  ObterPessoaPorId,
  ObterTodasPessoas,
} from "../controllers/pessoas/newFisica";
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
} from "../controllers/contratos/contratoOrm";
import {
  atualizarContratoPorId,
  obterContratoPorId,
} from "../services/contratos/contrato";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/user/authOrm";
import { inviteAdmin } from "../controllers/user/authOrm";
import { isAuthenticated } from "../middlewares/isAuth";
import { isAdmin, isAdminOuUser} from "../middlewares/ValidationStatusUser";
import fisica from "../routes/pessoas/fisica"
import juridica from "../routes/pessoas/juridica"
import empresa from "../routes/empresa/empresa"
import fiador from "../routes/pessoas/fiador"
import relationsempresa from "../routes/empresa/relationsEmpresa"
import anexosImoveis from "../routes/emails/anexos"

const router = express.Router();

router.use("/", fisica);
router.use("/", juridica)
router.use("/", fiador)

router.use("/", empresa)
router.use("/", relationsempresa)

router.use("/", anexosImoveis)

// Rotas para Imóveis
router.post("/cadastro-imovel", isAuthenticated, isAdminOuUser, CadastrarImovel);
router.get("/obter-imoveis-novo", isAuthenticated ,isAdmin, ObterTodosImoveis);
router.get("/obter-imovel/:id",  isAuthenticated, isAdminOuUser, ObterImovelPorId);
router.delete("/imovel-delete/:id",  isAuthenticated ,isAdmin, ExcluirImovel);
router.patch("/imovel-patch/:id", isAuthenticated, isAdminOuUser, AtualizarImovel);

// Rotas para Contratos
router.post("/cadastro-contrato",  isAuthenticated ,isAdmin, CadastrarContrato);
router.get("/obter-contratos-novo", isAuthenticated , isAdminOuUser, ObterTodosContratos);
router.get("/obter-contrato/:id",  isAuthenticated, isAdminOuUser, ObterContratoPorId);
router.delete("/contrato-delete/:id",   isAuthenticated ,isAdmin,ExcluirContrato);
router.patch("/contrato-patch/:id",  isAuthenticated ,isAdmin, AtualizarContrato);

// User
router.post("/users/invite-admin", inviteAdmin);
router.post("/admin/register", registerUser)
router.post("/users/login", loginUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


export default router;
