"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterImoveis = exports.registrarImovel = void 0;
const pg_1 = require("pg"); // Importe o Pool e QueryResult do pacote 'pg'
// Configuração do banco de dados
const dbConfig = {
    user: 'educc',
    host: 'localhost',
    database: 'tsadministradora',
    password: '1234',
    port: 5432,
};
// Crie uma nova instância de Pool com as configurações
const pool = new pg_1.Pool(dbConfig);
// Função para registrar um novo imóvel
const registrarImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, inquilino, proprietario, numeroImovel } = req.body;
        const novoImovel = {
            id,
            inquilino,
            proprietario,
            numeroImovel // Mantenha como string
        };
        // Execute a query para inserir o novo imóvel no banco de dados
        const query = `
      INSERT INTO imoveis (id, inquilino, proprietario, numero_imovel)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const values = [novoImovel.id, novoImovel.inquilino, novoImovel.proprietario, novoImovel.numeroImovel];
        const result = yield pool.query(query, values);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Erro ao registrar imóvel:', error);
        res.status(500).json({ error: 'Erro ao registrar imóvel' });
    }
});
exports.registrarImovel = registrarImovel;
// Função para obter todos os imóveis
const obterImoveis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Execute a query para obter todos os imóveis do banco de dados
        const query = `
      SELECT * FROM imoveis;
    `;
        const result = yield pool.query(query);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Erro ao obter imóveis:', error);
        res.status(500).json({ error: 'Erro ao obter imóveis' });
    }
});
exports.obterImoveis = obterImoveis;
