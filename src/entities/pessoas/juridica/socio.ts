import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PessoaJuridica } from "../../pessoaJuridica";

@Entity()
export class Socio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => PessoaJuridica, (pessoaJuridica) => pessoaJuridica.socios)
  pessoaJuridica: PessoaJuridica;
}
