import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Pessoa } from "./pessoaFisica";
import { Contrato } from "./contrato";
import { PessoaJuridica } from "./pessoaJuridica";

@Entity()
export class RegistroImovel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipoImovel: string;

  @Column()
  generoImovel: string;

  @Column("jsonb", { nullable: true })
  caracteristicas: {
    tipoConstrucao: string;
    numeroQuartos: number;
    numeroSuites: number;
    numeroBanheiros: number;
    numeroVagas: number;
    areaUtil: number;
    areaTotal: number;
  };

  @Column("jsonb", { nullable: true })
  negociacao: {
    tipo: string;
    valores: {
      valorVenda: number;
      taxaIntermediacao: number;
      valorAluguel: number;
      taxaAdministracao: number;
      taxaLocacao: number;
      vendaealuguelVenda: number;
      vendaealuguelAluguel: number;
      vendaealuguelTaxa: number;
    };
  };

  @Column()
  tipoIptu: string;

  @Column("jsonb", { nullable: true })
  iptu: {
    numero_matricula_iptu: number;
    valorMensal: number;
  };

  @Column()
  tipoCondominio: string;

  @Column("jsonb", { nullable: true })
  condominio: {
    nome_condominio: string;
    nome_administradora: string;
    razao_social: string;
    cnpj: string;
    site: string;
    login: string;
    senha: string;
    telefone_fixo: string;
    telefone_celular: string;
    valor_mensal: number;
  };

  @Column("jsonb", { nullable: true })
  localizacao: {
    cep: number;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    andar: number;
    numero: number;
  };

  @Column({ nullable: true })
  percentual: number;

  @Column("text", { array: true, nullable: true })
  caracteristicasImovel: string[];

  @Column("text", { array: true, nullable: true })
  caracteristicasCondominio: string[];

  @Column("text", { array: true, nullable: true })
  fotos: string[];

  /*Relacionamentos*/
  @ManyToMany(() => Contrato, (contrato) => contrato.imovel)
  @JoinTable()
  contratos: Contrato[];
  
  @ManyToMany(() => Pessoa, pessoa => pessoa.imoveis)
  @JoinTable()
  pessoas: Pessoa[];
  
/*
  @ManyToOne(() => PessoaJuridica)
  @JoinTable()
  proprietariosPessoaJuridica: PessoaJuridica[];
*/
}
