import express from 'express';
import { registrarCliente, obterClientes } from '../controllers/clienteController';
import { registrarImovel, obterImoveis } from '../controllers/imovelController';

const router = express.Router();

// Rotas para Clientes
router.post('/clientes', registrarCliente);
router.get('/clientes', obterClientes);

// Rotas para Imóveis
router.post('/imoveis', registrarImovel);
router.get('/imoveis', obterImoveis);

export default router;
