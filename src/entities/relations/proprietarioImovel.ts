import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { Pessoa } from "../pessoaFisica";
import { RegistroImovel } from "../imovel/imovel";
import { PessoaJuridica } from "../pessoaJuridica";

@Entity()
export class ProprietarioImovel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pessoa, (Pessoa) => Pessoa.imoveisRelacionados, {
    nullable: true,
  })
  @JoinColumn({ name: "pessoaId" })
  pessoa?: Pessoa;

  @ManyToOne(() => PessoaJuridica, (Pessoa) => Pessoa.imoveisRelacionadosJur, {
    nullable: true,
  })
  @JoinColumn({ name: "pessoaJuridicaId" })
  pessoaJuridica?: PessoaJuridica;

  @ManyToOne(
    () => RegistroImovel,
    (registroImovel) => registroImovel.imoveisProprietarios
  )
  @JoinColumn({ name: "registroImovelId" })
  registroImovel: RegistroImovel;

  @Column({ type: "float" })
  percentualPropriedade: number;
}
