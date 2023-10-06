import express from "express";
import {
    CadastrarPessoa,
    ObterTodasPessoas,
    ObterPessoaPorId,
    DeletarPessoaPorId,
    AtualizarPessoaPorId,
} from "../../controllers/pessoas/newFisica";
import { isAuthenticated } from "../../middlewares/isAuth";
import { isAdmin, isAdminOuUserOuUserJur} from "../../middlewares/ValidationStatusUser";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Usa o middleware do multer para lidar com o upload de arquivos.
router.post("/cadastrar-nova-pessoa-fisica", upload.array('dadosComuns[anexos][]', 10), CadastrarPessoa);
router.get("/obter-novas-pessoas", isAuthenticated ,isAdmin, ObterTodasPessoas);
router.get("/pessoa/:id",  ObterPessoaPorId);
router.delete("/pessoa-delete", isAuthenticated ,isAdmin,  DeletarPessoaPorId);
router.patch("/pessoa-patch/:id", isAuthenticated, isAdminOuUserOuUserJur, AtualizarPessoaPorId);

export default router;
