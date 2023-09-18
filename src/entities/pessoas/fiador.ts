import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Pessoa } from "../pessoaFisica";
import { RegistroImovel } from "../imovel";


@Entity()
export class Fiador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numeroMatriculaRGI: string;

  @ManyToOne(() => Pessoa, pessoa => pessoa.fiador)
  pessoa: Pessoa;

  @ManyToOne(() => RegistroImovel)
  imovelComoFianca: RegistroImovel;
}