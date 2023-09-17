import express from "express";

import {
  CadastrarPessoaJuridica,
  ObterTodasPessoasJuridicas,
  ObterPessoaJuridicaPorId,
  AtualizarPessoaJuridicaPorId,
  DeletarPessoaJuridicaPorId,
} from "../../controllers/newClienteJuridica";
import { isAuthenticated } from "../../middlewares/isAuth";
import { isAdmin, isAdminOuUser } from "../../middlewares/ValidationStatusUser";

const router = express.Router();

router.post("/cadastrar-nova-pessoa-juridica", CadastrarPessoaJuridica);
router.get("/obter-novas-pessoas-juridica", ObterTodasPessoasJuridicas);
router.get("/pessoa-juridica/:id", ObterPessoaJuridicaPorId);
router.delete("/pessoa-juridica-delete/:id", DeletarPessoaJuridicaPorId);
router.patch("/pessoa-juridica-patch/:id", AtualizarPessoaJuridicaPorId);

export default router