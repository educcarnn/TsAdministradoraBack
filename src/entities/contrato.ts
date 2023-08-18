import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Pessoa } from "./pessoaFisica";
import { PessoaJuridica } from "./pessoaJuridica";
import { RegistroImovel } from "./imovel";

@Entity()
export class Contrato {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.contratos)
  pessoa: Pessoa;

  @ManyToMany(() => PessoaJuridica)
  @JoinTable()
  proprietariosPessoaJuridica: PessoaJuridica[];

  @ManyToOne(() => RegistroImovel, (RegistroImovel) => RegistroImovel.contratos)
  imovel: RegistroImovel;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.contratos, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  proprietario: Pessoa | null;

  @Column()
  tipoContrato: string;

  @ManyToMany(() => Pessoa)
  @JoinTable()
  locatarios: Pessoa[];

  @Column()
  garantia: string;

  @Column()
  dataInicio: Date;

  @Column()
  dataTermino: Date;

  @Column()
  valor: number;

  @Column()
  seguradora: string;

  @Column()
  apolice: string;

  @Column()
  numeroParcelas: number;

  @Column()
  observacao: string;
}
