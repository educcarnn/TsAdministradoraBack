import { Request, Response } from "express";
import { Pool } from "pg";
import { ImovelData } from "../models/imovel";
import { validarImovel } from "../services/imovelValidation";

const pool = new Pool({
  user: "educc",
  host: "localhost",
  database: "tsadministradora",
  password: "1234",
  port: 5432,
});

export const registrarNovoImovel = async (req: Request, res: Response) => {
  const data: ImovelData = req.body;

  try {
    const validationErrors = validarImovel(data);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const client = await pool.connect();

    const query = `
    INSERT INTO tabela_imoveis (tipo_imovel, caracteristicas, tipo_negociacao, venda, aluguel, tipo_condominio, condominio)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  
  const values = [
    data.tipoImovel,
    JSON.stringify(data.caracteristicas),
    data.tipoNegociacao,
    data.venda ? JSON.stringify(data.venda) : null,
    data.aluguel ? JSON.stringify(data.aluguel) : null,
    data.tipoCondominio,
    data.condominio ? JSON.stringify(data.condominio) : null,
  ];
    await client.query(query, values);
    client.release();

    res.status(201).json({ message: "Imóvel registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar imóvel:", error);
    res.status(500).json({ message: "Erro ao registrar imóvel" });
  }
};

export const obterNovoImoveis = async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM tabela_imoveis";
    const result = await client.query(query);
    const imoveis = result.rows;
    client.release();
    res.status(200).json(imoveis);
  } catch (error) {
    console.error("Erro ao obter imóveis:", error);
    res.status(500).json({ message: "Erro ao obter imóveis" });
  }
};
