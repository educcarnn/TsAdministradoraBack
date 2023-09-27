import express from "express";
import {
  CadastrarInquilino,
  ObterInquilinoPorId,
  ExcluirInquilino,
  AtualizarInquilino
} from "../../controllers/pessoas/inquilino";

const router = express.Router();

router.post("/cadastrar-inquilino", CadastrarInquilino);
router.get("/obter-inquilino/:id", ObterInquilinoPorId);
router.delete("/deletar-inquilino", ExcluirInquilino);
router.patch("/atualizar-inquilino/:id", AtualizarInquilino);

export default router;
