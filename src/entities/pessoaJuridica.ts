import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Contrato } from "./contrato";
import { RegistroImovel } from "./imovel";

@Entity({ name: "tabela_pessoas_juridicas_orm" })
export class PessoaJuridica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  funcao: string;

  @Column()
  cnpj: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column()
  dataAberturaEmpresa: string;

  @Column()
  novoSocioAdministrador: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column("jsonb", { nullable: true })
  endereco: {
    cep: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
  };

  @Column("jsonb", { nullable: true })
  dadoBancarios: {
    chavePix: string;
    banco: string;
    agencia: string;
    conta: string;
  };

  @Column("jsonb", { nullable: true })
  anexos: string[];

  /*RELACIONAMENTOS*/
  @Column("jsonb", { nullable: true })
  lista_email: string[];

  @Column("jsonb", { nullable: true })
  lista_repasse: string[];

  @OneToMany(() => Contrato, contrato => contrato.PessoaJuridica, {nullable: true})
  contratos: Contrato[];

  @OneToMany(() => RegistroImovel, (imovel) => imovel.PessoaJuridica, { nullable: true })
  imoveis: RegistroImovel[];
}
