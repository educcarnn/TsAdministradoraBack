import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Pessoa } from "../pessoaFisica";
import { RegistroImovel } from "../imovel/imovel";
import { PessoaJuridica } from "../pessoaJuridica";

@Entity()
export class Proprietario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.proprietario)
  @JoinColumn({ name: "pessoa_id" })
  pessoa: Pessoa;

  @ManyToOne(() => RegistroImovel, { nullable: true })
  @JoinColumn({ name: "registro_imovel_id" })
  registroImovel: RegistroImovel;

  @ManyToOne(() => PessoaJuridica)
  @JoinColumn({ name: "pessoa_juridica_id" })
  pessoaJuridica: PessoaJuridica;

  @Column({ nullable: true })
  percentual: string;
}
