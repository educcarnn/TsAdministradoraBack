import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Contrato } from "../../entities/contrato"; // Substitua [path_to_contrato_file] pelo caminho correto do arquivo.
import { Pessoa } from "../pessoaFisica";


@Entity()
export class ContratoInquilino {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  percentual: number;

  @ManyToOne(() => Contrato, contrato => contrato.inquilinoRelacoes)
  contrato: Contrato;

  @ManyToOne(() => Pessoa, Pessoa => Pessoa.contratoRelacoes)
  inquilino: Pessoa;
}