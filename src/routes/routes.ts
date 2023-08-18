import express from 'express';
import { cadastrarPessoaFisica, cadastrarPessoaJuridica, obterUsuariosCadastrados} from '../controllers/clienteController';
import { registrarNovoImovel, obterTodosImoveis } from '../controllers/imovelControllers';
import { obterUsuarioPorId } from '../controllers/clienteController';
import { AtualizarPessoaPorId, CadastrarPessoa, DeletarPessoaPorId, ObterPessoaPorId, ObterTodasPessoas } from '../controllers/newCliente';
import { CadastrarPessoaJuridica, ObterTodasPessoasJuridicas, ObterPessoaJuridicaPorId, AtualizarPessoaJuridicaPorId, DeletarPessoaJuridicaPorId} from '../controllers/newClienteJuridica';
import { CadastrarImovel, ObterTodosImoveis } from '../controllers/imovelOrm';

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
router.get('/pessoa/:id', ObterPessoaPorId)
router.delete('/pessoa-delete/:id', DeletarPessoaPorId)
router.patch('/pessoa-patch/:id', AtualizarPessoaPorId)

//Juridica
router.post('/cadastrar-nova-pessoa-juridica', CadastrarPessoaJuridica)
router.get('/obter-novas-pessoas-juridica', ObterTodasPessoasJuridicas)
router.get('/pessoa-juridica/:id', ObterPessoaJuridicaPorId)
router.delete('/pessoa-juridica-delete/:id', DeletarPessoaJuridicaPorId)
router.patch('/pessoa-juridica-patch/:id', AtualizarPessoaJuridicaPorId)

// Rotas para Imóveis
router.post("/cadastrar-imovel", registrarNovoImovel);
router.get("/obter-imoveis-cadastrados", obterTodosImoveis)

    router.post("/cadastro-imovel", CadastrarImovel)
    router.post("/obter-imoveis", ObterTodosImoveis)


// Rotas para Contratos



export default router;
