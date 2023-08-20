import express from 'express';
import { AtualizarPessoaPorId, CadastrarPessoa, DeletarPessoaPorId, ObterPessoaPorId, ObterTodasPessoas } from '../controllers/newCliente';
import { CadastrarPessoaJuridica, ObterTodasPessoasJuridicas, ObterPessoaJuridicaPorId, AtualizarPessoaJuridicaPorId, DeletarPessoaJuridicaPorId} from '../controllers/newClienteJuridica';
import { CadastrarImovel, ObterTodosImoveis, ObterImovelPorId, ExcluirImovel, AtualizarImovel} from '../controllers/imovelOrm';
import { CadastrarContrato, ObterTodosContratos, ObterContratoPorId, ExcluirContrato, AtualizarContrato } from '../controllers/contratoOrm';
import { atualizarContratoPorId, obterContratoPorId } from '../services/contrato';

const router = express.Router();

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

    // Vínculos

    
export default router;
