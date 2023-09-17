import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RegistroImovel } from "./imovel";
import { Pessoa } from "./pessoaFisica";

@Entity("empresas")
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @OneToMany(() => Pessoa, (pessoa) => pessoa.empresa)
  pessoas: Pessoa[];
}
