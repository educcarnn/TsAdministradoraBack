import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "tabela_pessoas_fisicas" })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column("simple-array")
  funcao: string[];

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  identidade: string;

  @Column()
  orgao_expedidor: string;

  @Column()
  data_nascimento: Date;

  @Column()
  profissao: string;

  @Column()
  estado_civil: string;

  @Column()
  filiacao_mae: string;

  @Column()
  filiacao_pai: string;

  @Column()
  nacionalidade: string;

  @Column()
  telefone_fixo: string;

  @Column()
  telefone_celular: string;

  @Column()
  email: string;
}