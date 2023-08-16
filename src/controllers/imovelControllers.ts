import { Request, Response } from "express";
import { Pool } from "pg";
import { ImovelData } from "../models/imovel"; // Certifique-se de que o caminho esteja correto

const pool = new Pool({
  user: "educc",
  host: "localhost",
  database: "tsadministradora",
  password: "1234",
  port: 5432, // Porta padrão do PostgreSQL
});

export const registrarNovoImovel = async (req: Request, res: Response) => {
  const data: ImovelData = req.body;

  try {
    const client = await pool.connect();

    const query = `
    INSERT INTO tabela_registro_imovel
      (tipo_imovel, genero_imovel, tipo_construcao, numero_quartos, numero_suites,
       numero_banheiros, numero_vagas, area_util, area_total, tipo_negociacao,
       valor_venda, taxa_intermediacao, valor_aluguel, taxa_administracao,
       taxa_locacao, tipo_iptu, numero_matricula_iptu, valor_mensal_iptu,
       tipo_condominio, nome_condominio, nome_administradora, razao_social_condominio,
       cnpj_condominio, site_condominio, login_condominio, senha_condominio,
       telefone_fixo_condominio, telefone_celular_condominio, valor_mensal_condominio,
       proprietario, percentual, novos_proprietarios, cep, endereco, bairro, cidade, estado,
       andar, numero, caracteristicas_imovel, caracteristicas_condominio)  
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
       $11, $12, $13, $14, $15, $16, $17, $18,
       $19, $20, $21, $22, $23, $24, $25, $26,
       $27, $28, $29, $30, $31, $32, $33, $34,
       $35, $36, $37, $38, $39, $40, $41); 
  `;

    const values = [
      data.tipoImovel,
      data.generoImovel,
      data.caracteristicas.tipoConstrucao,
      data.caracteristicas.numeroQuartos,
      data.caracteristicas.numeroSuites,
      data.caracteristicas.numeroBanheiros,
      data.caracteristicas.numeroVagas,
      data.caracteristicas.areaUtil,
      data.caracteristicas.areaTotal,
      data.tipoNegociacao,
      data.venda ? data.venda.valorVenda : null,
      data.venda ? data.venda.taxaIntermediacao : null,
      data.aluguel ? data.aluguel.valorAluguel : null,
      data.aluguel ? data.aluguel.taxaAdministracao : null,
      data.aluguel ? data.aluguel.taxaLocacao : null,
      data.tipoIptu,
      data.iptu?.numero_matricula_iptu || null,
      data.iptu?.valorMensal || null,
      data.tipoCondominio,
      data.condominio?.nome_condominio || null,
      data.condominio?.nome_administradora || null,
      data.condominio?.razao_social_condominio || null,
      data.condominio?.cnpj_condominio || null,
      data.condominio?.site_condominio || null,
      data.condominio?.login_condominio || null,
      data.condominio?.senha_condominio || null,
      data.condominio?.telefone_fixo_condominio || null,
      data.condominio?.telefone_celular_condominio || null,
      data.condominio?.valor_mensal_condominio || null,
      data.proprietários.proprietário,
      data.proprietários.percentual,
      JSON.stringify(data.proprietários.novos_proprietarios),
      data.localizacao.cep,
      data.localizacao.endereco,
      data.localizacao.bairro,
      data.localizacao.cidade,
      data.localizacao.estado,
      data.localizacao.andar,
      data.localizacao.numero,
      data.caracteristicas_imovel,
      data.caracteristicas_condominio,
    ];

    await client.query(query, values);
    client.release();

    res.status(201).json({ message: "Imóvel registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar imóvel:", error);
    res.status(500).json({ message: "Erro ao registrar imóvel" });
  }
};

export const obterTodosImoveis = async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();

    const query = `
      SELECT * FROM tabela_registro_imovel;
    `;

    const result = await client.query(query);
    const imoveis = result.rows;

    client.release();

    res.status(200).json(imoveis);
  } catch (error) {
    console.error("Erro ao obter imóveis:", error);
    res.status(500).json({ message: "Erro ao obter imóveis" });
  }
};
