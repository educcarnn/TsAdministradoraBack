import express from 'express';
import { cadastrarPessoaFisica, cadastrarPessoaJuridica, obterUsuariosCadastrados} from '../controllers/clienteController';
import { registrarNovoImovel, obterTodosImoveis } from '../controllers/imovelControllers';
import { obterUsuarioPorId } from '../controllers/clienteController';
import { CadastrarPessoa, ObterTodasPessoas } from '../controllers/newCliente';
import { CadastrarPessoaJuridica, ObterTodasPessoasJuridicas } from '../controllers/newClienteJuridica';

const router = express.Router();

// Rotas para Clientes
    // Rota para cadastrar Pessoa Física
    router.post('/cadastrar-pessoa-fisica', cadastrarPessoaFisica);

    // Rota para cadastrar Pessoa Jurídica
    router.post('/cadastrar-pessoa-juridica', cadastrarPessoaJuridica);

router.get('/obter-usuarios-cadastrados', obterUsuariosCadastrados); 
router.get('/obter-usuario/:id', obterUsuarioPorId);

// Clientes
router.post('/cadastrar-nova-pessoa-fisica', CadastrarPessoa);
router.get('/obter-novas-pessoas', ObterTodasPessoas)

router.post('/cadastrar-nova-pessoa-juridica', CadastrarPessoaJuridica)
router.get('/obter-novas-pessoas-juridica', ObterTodasPessoasJuridicas)

// Rotas para Imóveis
router.post("/cadastrar-imovel", registrarNovoImovel);
router.get("/obter-imoveis-cadastrados", obterTodosImoveis)


// Rotas para Contratos


// Rotas para Aluguel

export default router;
