import express from "express";

import {
  CadastrarSocio,
  ObterSocioPorId,
  ExcluirSocio,
  AtualizarSocios,
} from "../../../controllers/pessoas/Jurídica/socios";

const router = express.Router();

router.post("/cadastrar-socio", CadastrarSocio);
router.get("/obter-socio/:id", ObterSocioPorId);
router.delete("/deletar-socio", ExcluirSocio);
router.patch("/atualizar-socio", AtualizarSocios);

export default router;
