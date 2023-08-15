import express from 'express';
import { cadastrarPessoaFisica, cadastrarPessoaJuridica, obterUsuariosCadastrados} from '../controllers/clienteController';
import { registrarImovel, obterImoveis } from '../controllers/aluguelController';


const router = express.Router();

// Rotas para Clientes
    // Rota para cadastrar Pessoa Física
    router.post('/cadastrar-pessoa-fisica', cadastrarPessoaFisica);

    // Rota para cadastrar Pessoa Jurídica
    router.post('/cadastrar-pessoa-juridica', cadastrarPessoaJuridica);

    router.get('/obter-usuarios-cadastrados', obterUsuariosCadastrados); 
// Rotas para Imóveis


// Rotas para Contratos

// Rotas para Aluguel
router.post('/aluguel', registrarImovel);
router.get('/aluguel', obterImoveis);

export default router;
