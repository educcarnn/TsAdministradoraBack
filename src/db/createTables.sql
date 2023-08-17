CREATE TABLE imoveis (
  id SERIAL PRIMARY KEY,
  inquilino VARCHAR(255),
  proprietario VARCHAR(255),
  numero_imovel VARCHAR(255)
);

CREATE TABLE tabela_pessoas_fisicas (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(20) NOT NULL,
  funcao TEXT[] NOT NULL,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  identidade VARCHAR(20) NOT NULL,
  orgao_expedidor VARCHAR(50) NOT NULL,
  data_nascimento DATE NOT NULL,
  profissao VARCHAR(100) NOT NULL,
  estado_civil VARCHAR(50) NOT NULL,
  filiacao_mae VARCHAR(100) NOT NULL,
  filiacao_pai VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(50) NOT NULL,
  telefone_fixo VARCHAR(20) NOT NULL,
  telefone_celular VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE tabela_pessoas_juridicas (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(50),
  funcao VARCHAR(100)[] NOT NULL,
  cnpj VARCHAR(14) NOT NULL,
  razao_social VARCHAR(100) NOT NULL,
  nome_fantasia VARCHAR(100) NOT NULL,
  endereco VARCHAR(200) NOT NULL,
  data_abertura_empresa DATE NOT NULL,
  novo_socio_administrador VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL
);


CREATE TABLE tabela_registro_imovel (
  id SERIAL PRIMARY KEY,
  tipo_imovel VARCHAR(20),
  genero_imovel VARCHAR(255),
  tipo_construcao VARCHAR(255),
  numero_quartos INT,
  numero_suites INT,
  numero_banheiros INT,
  numero_vagas INT,
  area_util FLOAT,
  area_total FLOAT,
  tipo_negociacao VARCHAR(20),
  valor_venda NUMERIC,
  taxa_intermediacao NUMERIC,
  valor_aluguel NUMERIC,
  taxa_administracao NUMERIC,
  taxa_locacao NUMERIC,
  tipo_iptu VARCHAR(20),
  numero_matricula_iptu INT,
  valor_mensal_iptu NUMERIC,
  tipo_condominio VARCHAR(20),
  nome_condominio VARCHAR(255),
  nome_administradora VARCHAR(255),
  razao_social_condominio VARCHAR(255),
  cnpj_condominio VARCHAR(20),
  site_condominio VARCHAR(255),
  login_condominio VARCHAR(255),
  senha_condominio VARCHAR(255),
  telefone_fixo_condominio VARCHAR(20),
  telefone_celular_condominio VARCHAR(20),
  valor_mensal_condominio NUMERIC,
  proprietario VARCHAR(255),
  percentual NUMERIC,
  novos_proprietarios JSONB,
  cep INT, 
  endereco VARCHAR(255),
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  estado VARCHAR(10),
  andar INT,
  numero INT, 
  caracteristicas_imovel VARCHAR(100)[] NOT NULL,
  caracteristicas_condominio VARCHAR(100)[] NOT NULL,
);



  

