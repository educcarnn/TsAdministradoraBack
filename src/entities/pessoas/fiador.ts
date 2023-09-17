import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Pessoa } from "../pessoaFisica";
import { RegistroImovel } from "../imovel";

@Entity()
export class Fiador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numeroMatriculaRGI: string;

  @OneToOne(() => Pessoa)
  pessoa: Pessoa;

  @ManyToOne(() => RegistroImovel)
  imovelComoFianca: RegistroImovel;
}
