export interface Imovel {
  id: number;
  inquilino: string;
  proprietario: string;
  numeroImovel: string;
}

export interface ImovelData {
  tipoImovel: "residencial" | "comercial";
  tipoConstrução: string,
  caracteristicas: {
    tipoConstrucao: string;
    numeroQuartos: number;
    numeroSuites: number;
    numeroBanheiros: number;
    numeroVagas: number;
    areaUtil: number;
    areaTotal: number;
  };
  tipoNegociacao: "venda" | "aluguel" | "venda-e-aluguel";
  venda?: {
    valorVenda: number;
    taxaIntermediacao: number;
  };
  aluguel?: {
    valorAluguel: number;
    taxaAdministracao: number;
    taxaLocacao: number;
  };
  tipoCondominio: "isento" | "naoIsento";
  condominio?: {
    nomeCondominio: string;
    nomeAdministradora: string;
    razaoSocial: string;
    cnpj: string;
    site: string;
    login: string;
    senha: string;
    telefoneFixo: string;
    telefoneCelular: string;
    valorMensal: number;
  };
}
