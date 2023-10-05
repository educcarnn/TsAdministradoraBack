import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,

} from "typeorm";
import { Pessoa } from "../pessoaFisica";
import { User } from "../user";

import { PessoaJuridica } from "../pessoaJuridica";
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
  pessoaJuridicas: PessoaJuridica[]; 

  @OneToMany(() => User, user => user.empresa)
  administradores: User[];
}
