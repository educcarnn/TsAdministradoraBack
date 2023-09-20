import express from "express";
import {
  CadastrarImovelComAnexos,
  DeletarAnexosImovel,
} from "../../controllers/emails/anexos";

const router = express.Router();
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/imoveis/anexos/:id",
  upload.array("anexos", 10),
  CadastrarImovelComAnexos
);

router.delete("/imoveis/:id/anexos", DeletarAnexosImovel);

export default router;
