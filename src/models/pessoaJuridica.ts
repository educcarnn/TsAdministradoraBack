export interface PessoaJuridica {
    tipo: 'Jurídica';
    funcao: string[];
    inquilino: boolean;
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    endereco: string;
    dataAberturaEmpresa: string;
    novoSocioAdministrador: string;
    telefone: string;
    email: string;
    pdf: string | null;
  }
  
