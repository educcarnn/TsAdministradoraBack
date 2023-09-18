import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable
} from "typeorm";

import { Pessoa } from "./pessoaFisica";
import { User } from "./user";

import { PessoaJuridica } from "./pessoaJuridica";
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

  @OneToMany(() => PessoaJuridica, (PessoaJuridica) => PessoaJuridica.empresa, {
    cascade: true,
  })
  pessoaJuridicas: PessoaJuridica[]; // mudança do nome de pessoaJuridica para pessoaJuridicas indicando ser uma lista

  @OneToMany(() => User, user => user.empresaAdministrada)
  administradores: User[];  // Nome mudado para "administradores" para refletir que pode haver vários
}
