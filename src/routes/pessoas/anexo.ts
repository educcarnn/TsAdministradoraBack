import express from "express";
import multer from "multer";
import {
  adicionarAnexoAPessoaFisicaController,
  adicionarAnexoAPessoaJuridicaController,
  removerAnexoDaPessoaFisicaPorIdController,
  removerAnexoDaPessoaJuridicaPorIdController
} from "../../controllers/pessoas/anexo";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rotas para pessoas físicas
router.post(
  "/adicionar-anexo-pessoa-fisica",
  upload.array("listaAnexosFisica", 10),
  adicionarAnexoAPessoaFisicaController
);
router.delete(
  "/remover-anexo-pessoa-fisica",
  removerAnexoDaPessoaFisicaPorIdController
);

// Rotas para pessoas jurídicas
router.post(
  "/adicionar-anexo-pessoa-juridica",
  upload.array("listaAnexosJuridica", 10),
  adicionarAnexoAPessoaJuridicaController
);
router.delete(
  "/remover-anexo-pessoa-juridica",
  removerAnexoDaPessoaJuridicaPorIdController
);

export default router;
