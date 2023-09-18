import express from "express";
import {
    CadastrarPessoa,
    ObterTodasPessoas,
    ObterPessoaPorId,
    DeletarPessoaPorId,
    AtualizarPessoaPorId,
} from "../../controllers/pessoas/newFisica";
import { isAuthenticated } from "../../middlewares/isAuth";
import { isAdmin, isAdminOuUser} from "../../middlewares/ValidationStatusUser";
import multer from "multer";
const router = express.Router();
// Define onde os arquivos serão armazenados temporariamente
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/cadastrar-nova-pessoa-fisica", upload.array('anexos', 10), CadastrarPessoa);
router.get("/obter-novas-pessoas", isAuthenticated ,isAdmin, ObterTodasPessoas);
router.get("/pessoa/:id",  ObterPessoaPorId);
router.delete("/pessoa-delete/:id", isAuthenticated ,isAdmin,  DeletarPessoaPorId);
router.patch("/pessoa-patch/:id", isAuthenticated, isAdminOuUser, AtualizarPessoaPorId);

export default router;
