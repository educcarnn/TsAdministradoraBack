import express from 'express';
import { registrarCliente, obterClientes } from '../controllers/clienteController';
import { registrarImovel, obterImoveis } from '../controllers/aluguelController';

const router = express.Router();

// Rotas para Clientes
router.post('/clientes', registrarCliente);
router.get('/clientes', obterClientes);

// Rotas para Imóveis


// Rotas para Contratos

// Rotas para Aluguel
router.post('/aluguel', registrarImovel);
router.get('/aluguel', obterImoveis);

export default router;
