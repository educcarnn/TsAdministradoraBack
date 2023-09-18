import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Contrato } from "../contratos/contrato";
import { Pessoa } from "../pessoaFisica";

@Entity()
export class ContratoProprietario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  percentual: number;

  @ManyToOne(() => Contrato, (contrato) => contrato.proprietarioRelacoes)
  contrato: Contrato;

  @ManyToOne(() => Pessoa, (Pessoa) => Pessoa.contratoProprietarioRelacoes)
  proprietario: Pessoa;
}
