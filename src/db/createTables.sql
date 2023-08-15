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
  tipo VARCHAR(20) NOT NULL,
  funcao TEXT[] NOT NULL,
  inquilino BOOLEAN NOT NULL,
  cnpj VARCHAR(18) NOT NULL,
  razao_social VARCHAR(100) NOT NULL,
  nome_fantasia VARCHAR(100) NOT NULL,
  endereco VARCHAR(200) NOT NULL,
  data_abertura_empresa DATE NOT NULL,
  novo_socio_administrador VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL
);