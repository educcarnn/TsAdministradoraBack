/*
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "tabela_pessoas_juridicas" })
export class PessoaJuridica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column("simple-array")
  funcao: string[];

  @Column()
  cnpj: string;

  @Column()
  razao_social: string;

  @Column()
  nome_fantasia: string;

  @Column()
  endereco: string;

  @Column()
  data_abertura_empresa: Date;

  @Column()
  novo_socio_administrador: string;

  @Column()
  telefone: string;

  @Column()
  email: string;
}
