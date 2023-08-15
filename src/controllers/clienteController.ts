import { Request, Response } from "express";
import { Pool } from "pg";
import { PessoaFisica } from "../models/pessoaFisica";
import { PessoaJuridica } from "../models/pessoaJuridica";

const pool = new Pool({
  user: "educc",
  host: "localhost",
  database: "tsadministradora",
  password: "1234",
  port: 5432,
});


export const cadastrarPessoaFisica = async (req: Request, res: Response) => {
  const data: PessoaFisica = req.body;
  try {
    const client = await pool.connect();
    const query = `INSERT INTO tabela_pessoas_fisicas (tipo, funcao, nome, cpf, identidade, orgao_expedidor, data_nascimento, profissao, estado_civil, filiacao_mae, filiacao_pai, nacionalidade, telefone_fixo, telefone_celular, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
    const values = [data.tipo, data.funcao, data.nome, data.cpf, data.identidade, data.orgaoExpedidor, data.dataNascimento, data.profissao, data.estadoCivil, data.filiacao.mae, data.filiacao.pai, data.nacionalidade, data.telefoneFixo, data.telefoneCelular, data.email];
    await client.query(query, values);
    client.release();
    res.status(201).json({ message: "Pessoa Física cadastrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar Pessoa Física:", error);
    res.status(500).json({ message: "Erro ao cadastrar Pessoa Física" });
  }
};

export const cadastrarPessoaJuridica = async (req: Request, res: Response) => {
  const data: PessoaJuridica = req.body;
  try {
    const client = await pool.connect();
    const query = `
      INSERT INTO tabela_pessoas_juridicas (tipo, funcao, inquilino, cnpj, razao_social, nome_fantasia, endereco, data_abertura_empresa, novo_socio_administrador, telefone, email
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;
    const values = [data.tipo, data.funcao, data.inquilino, data.cnpj, data.razaoSocial, data.nomeFantasia, data.endereco, data.dataAberturaEmpresa, data.novoSocioAdministrador, data.telefone,data.email,];
    await client.query(query, values);
    client.release();
    res
      .status(201)
      .json({ message: "Pessoa Jurídica cadastrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar Pessoa Jurídica:", error);
    res.status(500).json({ message: "Erro ao cadastrar Pessoa Jurídica" });
  }
};


export const obterUsuariosCadastrados = async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();

    // Consulta para obter usuários de Pessoa Física
    const queryFisica = "SELECT * FROM tabela_pessoas_fisicas";
    const resultFisica = await client.query(queryFisica);
    const usuariosFisica = resultFisica.rows;

    // Consulta para obter usuários de Pessoa Jurídica
    const queryJuridica = "SELECT * FROM tabela_pessoas_juridicas";
    const resultJuridica = await client.query(queryJuridica);
    const usuariosJuridica = resultJuridica.rows;

    client.release();

    // Combinar resultados das duas consultas
    const usuariosCadastrados = [...usuariosFisica, ...usuariosJuridica];

    res.status(200).json(usuariosCadastrados);
  } catch (error) {
    console.error("Erro ao obter usuários cadastrados:", error);
    res.status(500).json({ message: "Erro ao obter usuários cadastrados" });
  }
};
