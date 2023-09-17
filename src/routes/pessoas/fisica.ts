import express from "express";
import {
    CadastrarPessoa,
    ObterTodasPessoas,
    ObterPessoaPorId,
    DeletarPessoaPorId,
    AtualizarPessoaPorId,
} from "../../controllers/newCliente";
import { isAuthenticated } from "../../middlewares/isAuth";
import { isAdmin, isAdminOuUser} from "../../middlewares/ValidationStatusUser";

const router = express.Router();

router.post("/cadastrar-nova-pessoa-fisica", CadastrarPessoa);
router.get("/obter-novas-pessoas", isAuthenticated ,isAdmin, ObterTodasPessoas);
router.get("/pessoa/:id",  ObterPessoaPorId);
router.delete("/pessoa-delete/:id", isAuthenticated ,isAdmin,  DeletarPessoaPorId);
router.patch("/pessoa-patch/:id", isAuthenticated, isAdminOuUser, AtualizarPessoaPorId);

export default router;
