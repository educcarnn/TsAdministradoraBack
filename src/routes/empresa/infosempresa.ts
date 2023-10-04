import express from "express";
import { obterImoveisDaEmpresaController } from "../../controllers/empresa/infosempresa";

const router = express.Router();

router.get("/obter-imoveis-da-empresa/:id", obterImoveisDaEmpresaController);

export default router;
