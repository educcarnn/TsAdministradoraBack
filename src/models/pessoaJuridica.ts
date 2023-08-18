export interface PessoaJuridica {
    tipo: 'Jurídica';
    funcao: string[];
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    endereco: string;
    dataAberturaEmpresa: string;
    novoSocioAdministrador: string;
    telefone: string;
    email: string;
    pdf: string | null;
    contratos:[];
    imoveis: [];
    lista_email_enviados: [];
    extrato_de_repassse: [];
  }
  
