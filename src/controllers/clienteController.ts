import { Request, Response } from 'express';
import { Cliente } from '../models/clientes';

export const registrarCliente = (req: Request, res: Response) => {

  try {
    const { id, nome, email, telefone } = req.body;

    // Crie um novo cliente com base nos dados da solicitação
    const novoCliente: Cliente = {
      id,
      nome, 
      email,
      telefone,
    };

    // Salve o cliente no banco de dados ou na fonte de dados apropriada
    // Exemplo: clientRepository.create(novoCliente);

    // Retorna o cliente registrado como resposta
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro ao registrar cliente:', error);
    res.status(500).json({ error: 'Erro ao registrar cliente' });
  }
};

// Função para obter todos os clientes
export const obterClientes = (req: Request, res: Response) => {
  // Lógica para obter todos os clientes
  try {
    // Obtenha a lista de clientes do banco de dados ou da fonte de dados
  

    // Retorna a lista de clientes como resposta
    //     res.status(200).json(clientes);
    res.status(200).json({sucess: 'Aqui fica os clientes cadastradsos'});
  } catch (error) {
    console.error('Erro ao obter clientes:', error);
    res.status(500).json({ error: 'Erro ao obter clientes' });
  }
};

// Outras funções de controle de cliente, se necessário
