import express from "express";

import {
  CadastrarFiador,
  ObterFiadorPorId,
  ExcluirFiador,
  AtualizarFiador
} from "../../controllers/pessoas/fiador"
const router = express.Router();

router.post("/cadastrar-fiador", CadastrarFiador);
router.get("/obter-fiador/:id", ObterFiadorPorId);
router.delete("/deletar-fiador", ExcluirFiador);
router.patch("/atualizar-fiador/:id", AtualizarFiador);

export default router;
