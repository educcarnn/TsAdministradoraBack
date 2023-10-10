import express from "express";
import {
  adicionarPessoaController,
  removerPessoaController,
  removerAdminController,
  associarAdminController, 
  associarPessoaJuridicaController
} from "../../controllers/empresa/controllerEmpresa"; // Atualize o caminho para o controlador correto
// import { isAuthenticated } from "../../middlewares/isAuth";
// import { isAdmin, isAdminOuUser } from "../../middlewares/ValidationStatusUser";

const router = express.Router();

// Rota para adicionar uma pessoa a uma empresa específica
router.post("/adicionar-pessoa-empresa", adicionarPessoaController);

// Rota para remover uma pessoa de uma empresa específica
router.delete("/deletar-pessoa-empresa", removerPessoaController);

router.delete("/deletar-admin-empresa", removerAdminController);

// Rota para associar um administrador a uma empresa específica
router.post("/associar-admin-empresa", associarAdminController);

// Rota para associar uma pessoa jurídica a uma empresa específica
router.post("/associar-pessoa-juridica-empresa", associarPessoaJuridicaController);


export default router;
