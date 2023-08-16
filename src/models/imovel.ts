export interface Imovel {
  id: number;
  inquilino: string;
  proprietario: string;
  numeroImovel: string;
}

export interface ImovelData {
  tipoImovel: "residencial" | "comercial";
  generoImovel: string;
  caracteristicas: {
    tipoConstrucao: string;
    numeroQuartos: number;
    numeroSuites: number;
    numeroBanheiros: number;
    numeroVagas: number;
    areaUtil: number;
    areaTotal: number;
  };
  tipoNegociacao: "venda" | "aluguel" | "vendaealuguel";
  venda?: {
    valorVenda: number;
    taxaIntermediacao: number;
  };
  aluguel?: {
    valorAluguel: number;
    taxaAdministracao: number;
    taxaLocacao: number;
  };
  vendaealuguel?: {
    valorVenda: number;
    valorAluguel: number;
    taxaIntermediacao: number;
  };
  tipoIptu: "isento" | "naoIsento";
  iptu?: {
    numero_matricula_iptu?: number;
    valorMensal?: number;
  };
  tipoCondominio: "isento" | "naoIsento";
  condominio?: {
    nome_condominio?: string;
    nome_administradora?: string;
    razao_social_condominio?: string;
    cnpj_condominio?: string;
    site_condominio?: string;
    login_condominio?: string;
    senha_condominio?: string;
    telefone_fixo_condominio?: string;
    telefone_celular_condominio?: string;
    valor_mensal_condominio?: number;
  };
  proprietários: {
    proprietário: string;
    percentual: number;
    novos_proprietarios: [];
  };
  localizacao: {
    cep: number;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    andar: number;
    numero: number;
  };
  caracteristicas_imovel: string[];
  caracteristicas_condominio: string[];
}
