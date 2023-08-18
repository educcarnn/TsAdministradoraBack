import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Contrato } from "./contrato";
import { RegistroImovel } from "./imovel";

@Entity({ name: "tabela_pessoas_juridicas_orm" })
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

  @ManyToMany(() => Contrato)
  @JoinTable()
  contratos: Contrato[];

  @ManyToMany(() => RegistroImovel)
  @JoinTable()
  propriedades: RegistroImovel[];
}