import express from "express";
import {
  CadastrarProprietario,
  ObterProprietarioPorId,
  ExcluirProprietario,
  AtualizarProprietario
} from "../../controllers/pessoas/proprietario";

const router = express.Router();

router.post("/cadastrar-proprietario", CadastrarProprietario);
router.get("/obter-proprietario/:id", ObterProprietarioPorId);
router.delete("/deletar-proprietario", ExcluirProprietario);
router.patch("/atualizar-proprietario/:id", AtualizarProprietario);

export default router;