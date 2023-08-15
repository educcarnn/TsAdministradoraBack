import express from 'express';
import { cadastrarPessoaFisica, cadastrarPessoaJuridica, obterUsuariosCadastrados} from '../controllers/clienteController';
import { registrarImovel, obterImoveis } from '../controllers/aluguelController';
import { registrarNovoImovel, obterNovoImoveis} from '../controllers/imovelControllers';

const router = express.Router();

// Rotas para Clientes
    // Rota para cadastrar Pessoa Física
    router.post('/cadastrar-pessoa-fisica', cadastrarPessoaFisica);

    // Rota para cadastrar Pessoa Jurídica
    router.post('/cadastrar-pessoa-juridica', cadastrarPessoaJuridica);

    router.get('/obter-usuarios-cadastrados', obterUsuariosCadastrados); 
// Rotas para Imóveis

router.post("/cadastrar-imovel", registrarNovoImovel);
router.get("/obter-imoveis", obterNovoImoveis);

// Rotas para Contratos

// Rotas para Aluguel
router.post('/aluguel', registrarImovel);
router.get('/aluguel', obterImoveis);

export default router;
