import express from "express";

import {
  CadastrarPessoaJuridica,
  ObterTodasPessoasJuridicas,
  ObterPessoaJuridicaPorId,
  AtualizarPessoaJuridicaPorId,
  DeletarPessoaJuridicaPorId,
} from "../../controllers/pessoas/newJuridica";
import { isAuthenticated } from "../../middlewares/isAuth";
import { isAdmin, isAdminOuUserOuUserJur } from "../../middlewares/ValidationStatusUser";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/cadastrar-nova-pessoa-juridica", upload.array('dadosComuns[anexos][]', 10), CadastrarPessoaJuridica);
router.get("/obter-novas-pessoas-juridica", ObterTodasPessoasJuridicas);
router.get("/pessoa-juridica/:id", ObterPessoaJuridicaPorId);
router.delete("/pessoa-juridica-delete", DeletarPessoaJuridicaPorId);
router.patch("/pessoa-juridica-patch/:id", AtualizarPessoaJuridicaPorId);

export default router