import express from "express";

import {
  CadastrarEmpresa,
  ObterTodasEmpresas,
  ObterEmpresaPorId,
  AtualizarEmpresa,
  ExcluirEmpresa,
} from "../../controllers/empresa/empresa"; // Atualize o caminho para o controlador correto
import { isAuthenticated } from "../../middlewares/isAuth";
import { isAdmin, isAdminOuUserOuUserJur } from "../../middlewares/ValidationStatusUser";

const router = express.Router();

router.post("/cadastrar-nova-empresa", CadastrarEmpresa);
router.get("/obter-todas-empresas", ObterTodasEmpresas);
router.get("/empresa/:id", ObterEmpresaPorId);
router.delete("/empresa-delete/:id", ExcluirEmpresa);
router.patch("/empresa-patch/:id", AtualizarEmpresa);

export default router;
