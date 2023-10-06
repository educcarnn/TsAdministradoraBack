import express from "express";
import {
  AtualizarPessoaPorId,
  CadastrarPessoa,
  DeletarPessoaPorId,
  ObterPessoaPorId,
  ObterTodasPessoas,
} from "../controllers/pessoas/newFisica";
import {
  CadastrarImovel,
  ObterTodosImoveis,
  ObterImovelPorId,
  ExcluirImovel,
  AtualizarImovel,
} from "../controllers/imovel/imovelOrm";
import {
  CadastrarContrato,
  ObterTodosContratos,
  ObterContratoPorId,
  ExcluirContrato,
  AtualizarContrato,
} from "../controllers/contratos/contratoOrm";
import {
  atualizarContratoPorId,
  obterContratoPorId,
} from "../services/contratos/contrato";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/user/authOrm";

import { isAuthenticated } from "../middlewares/isAuth";
import { isAdmin, isAdminOuUserOuUserJur} from "../middlewares/ValidationStatusUser";
import fisica from "../routes/pessoas/fisica"
import juridica from "../routes/pessoas/juridica"
import empresa from "../routes/empresa/empresa"
import fiador from "../routes/pessoas/fiador"
import inquilino from "../routes/pessoas/inquilino"
import proprietario from "../routes/pessoas/proprietario"
import relationsempresa from "../routes/empresa/relationsEmpresa"
import anexoPessoa from "../routes/pessoas/anexo"
import { removerAnexoDoImovelPorIdController } from "../controllers/imovel/anexos";
import { adicionarAnexoAoImovelController } from "../controllers/imovel/anexos";
import { adicionarFotoAoImovelController } from "../controllers/imovel/anexos";
import { removerFotoDoImovelPorIdController } from "../controllers/imovel/anexos";
import { adicionarContratoAoImovelController } from "../controllers/imovel/contratoservico";
import { removerContratoDoImovelPorIdController } from "../controllers/imovel/contratoservico";
import socio from "../routes/pessoas/Jurídica/socio"
import invite from "../routes/emails/invite"
import infosempresa from "../routes/empresa/infosempresa"
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
module.exports = router;
// Pessoa
router.use("/", fisica);
router.use("/", juridica)

router.use("/", invite)

router.use("/", fiador)
router.use("/", inquilino)
router.use("/", proprietario)
router.use("/", socio)

// Empresa
router.use("/", empresa)
router.use("/", infosempresa)
router.use("/", relationsempresa)
router.use("/", anexoPessoa)


// Rotas para Imóveis
router.post("/cadastro-imovel", 
  upload.fields([
    { name: 'fotos', maxCount: 10 },
    { name: 'anexos', maxCount: 10 }, 
    {name: 'contratos', maxCount: 10}
  ]),
  isAuthenticated,
  isAdminOuUserOuUserJur,
  CadastrarImovel
);

router.get("/obter-imoveis-novo", isAuthenticated ,isAdmin, ObterTodosImoveis);
router.get("/obter-imovel/:id",  isAuthenticated, isAdminOuUserOuUserJur, ObterImovelPorId);
router.delete("/imovel-delete/:id",  isAuthenticated ,isAdmin, ExcluirImovel);
router.patch("/imovel-patch/:id", isAuthenticated, isAdminOuUserOuUserJur, AtualizarImovel);


router.delete("/remover-anexos-imovel",removerAnexoDoImovelPorIdController )
router.post("/adicionar-anexos-imovel", upload.array('listaAnexos', 10), adicionarAnexoAoImovelController)

router.post("/adicionar-fotos-imovel", upload.array('listaFotos', 10), adicionarFotoAoImovelController)
router.delete("/remover-fotos-imovel", removerFotoDoImovelPorIdController)

router.post("/adicionar-para-contratos-imovel", upload.array('listaContratos', 10), adicionarContratoAoImovelController )
router.delete("/remover-contratos-imovel", removerContratoDoImovelPorIdController)

// Rotas para Contratos
router.post("/cadastro-contrato",  isAuthenticated ,isAdmin, CadastrarContrato);
router.get("/obter-contratos-novo", isAuthenticated , isAdminOuUserOuUserJur, ObterTodosContratos);
router.get("/obter-contrato/:id",  isAuthenticated, isAdminOuUserOuUserJur, ObterContratoPorId);
router.delete("/contrato-delete/:id",   isAuthenticated ,isAdmin,ExcluirContrato);
router.patch("/contrato-patch/:id",  isAuthenticated ,isAdmin, AtualizarContrato);

// User
router.post("/admin/register", registerUser)
router.post("/users/login", loginUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


export default router;
