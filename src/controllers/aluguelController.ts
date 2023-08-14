import { Request, Response } from "express";
import { Pool, QueryResult } from "pg"; // Importe o Pool e QueryResult do pacote 'pg'
import { Imovel } from "../models/imovel";

// Configuração do banco de dados
const dbConfig = {
  connectionString:
    "postgres://tsadministradoback:M76iYdAFvTmHIKVF0FgFz9YD64QYS2bs@dpg-cjd6o0s5kgrc73avnndg-a.oregon-postgres.render.com/tsadministradoback",
  ssl: {
    rejectUnauthorized: false, // Configuração para permitir conexões SSL não verificadas
  },
};

const pool = new Pool(dbConfig);

// Função para registrar um novo imóvel
let proximoId = 1; // Inicializa o próximo ID como 1

export const registrarImovel = async (req: Request, res: Response) => {
  try {
    const { id, inquilino, proprietario, numeroImovel } = req.body;

    const novoImovel: Imovel = {
      id: proximoId,
      inquilino,
      proprietario,
      numeroImovel, // Mantenha como string
    };

    proximoId++;

    // Execute a query para inserir o novo imóvel no banco de dados
    const query = `
      INSERT INTO imoveis (id, inquilino, proprietario, numero_imovel)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [
      novoImovel.id,
      novoImovel.inquilino,
      novoImovel.proprietario,
      novoImovel.numeroImovel,
    ];

    const result: QueryResult = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao registrar imóvel:", error);
    res.status(500).json({ error: "Erro ao registrar imóvel" });
  }
};

// Função para obter todos os imóveis
export const obterImoveis = async (req: Request, res: Response) => {
  try {
    // Execute a query para obter todos os imóveis do banco de dados
    const query = `
      SELECT * FROM imoveis;
    `;

    const result: QueryResult = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao obter imóveis:", error);
    res.status(500).json({ error: "Erro ao obter imóveis" });
  }
};
