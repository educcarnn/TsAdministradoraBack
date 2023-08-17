interface Filiacao {
    mae: string;
    pai: string;
  }
  
  export interface PessoaFisica {
    tipo: 'Física';
    funcao: string[];
    nome: string;
    cpf: string;
    identidade: string;
    orgaoExpedidor: string;
    dataNascimento: string;
    profissao: string;
    estadoCivil: string;
    filiacao: Filiacao;
    nacionalidade: string;
    telefoneFixo: string;
    telefoneCelular: string;
    email: string;
    endereco: string;
    genero: string;
    pdf: string | null;
    contratos: [];
    imóveis: [];
    lista_email_enviados: [];
    extrato_de_repassse: [];
  }
  

  