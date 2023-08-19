import express from 'express';
import { cadastrarPessoaFisica, cadastrarPessoaJuridica, obterUsuariosCadastrados} from '../controllers/clienteController';
import { registrarNovoImovel, obterTodosImoveis } from '../controllers/imovelControllers';
import { obterUsuarioPorId } from '../controllers/clienteController';
import { AtualizarPessoaPorId, CadastrarPessoa, DeletarPessoaPorId, ObterPessoaPorId, ObterTodasPessoas } from '../controllers/newCliente';
import { CadastrarPessoaJuridica, ObterTodasPessoasJuridicas, ObterPessoaJuridicaPorId, AtualizarPessoaJuridicaPorId, DeletarPessoaJuridicaPorId} from '../controllers/newClienteJuridica';
import { CadastrarImovel, ObterTodosImoveis, ObterImovelPorId, ExcluirImovel, AtualizarImovel} from '../controllers/imovelOrm';
import { CadastrarContrato, ObterTodosContratos, ObterContratoPorId, ExcluirContrato, AtualizarContrato } from '../controllers/contratoOrm';
import { atualizarContratoPorId, obterContratoPorId } from '../services/contrato';

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
router.post('/cadastrar-imovel', registrarNovoImovel);
router.get('/obter-imoveis-cadastrados', obterTodosImoveis)

    router.post('/cadastro-imovel', CadastrarImovel)
    router.get('/obter-imoveis-novo', ObterTodosImoveis)
    router.get('/obter-imovel/:id', ObterImovelPorId)
    router.delete('/imovel-delete/:id', ExcluirImovel)
    router.patch('/imovel-patch/:id', AtualizarImovel)

// Rotas para Contratos
router.post('/cadastro-contrato', CadastrarContrato)
router.get('/obter-contratos-novo', ObterTodosContratos)
router.get('/obter-contrato/:id', obterContratoPorId )
router.delete('/contrato-delete/:id', ExcluirContrato)
router.patch('/contrato-patch/:id', AtualizarContrato)


export default router;
