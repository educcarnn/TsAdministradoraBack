import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Pessoa } from "./pessoaFisica";
import { PessoaJuridica } from "./pessoaJuridica";
import { RegistroImovel } from "./imovel";

@Entity()
export class Contrato {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => PessoaJuridica, {nullable: true})
  @JoinTable()
  proprietariosPessoaJuridica: PessoaJuridica[];

  @Column()
  tipoContrato: string;

  @Column("jsonb", {nullable: true}) // Armazena os objetos como JSON
  garantia: {
    tipo: string;
    fiador: string;
    dataInicio: string;
    dataTermino: string;
    valor: number;
    seguradora: string;
    apolice: string;
    numeroParcelas: number;
    observacao: string;
  };

  @Column("jsonb", {nullable: true}) // Armazena os objetos como JSON
  detalhesContrato: {
    dataInicio: string;
    dataTermino: string;
    valor: number;
    seguradora: string;
    apolice: string;
    numeroParcelas: number;
    observacao: string;
  };

  // RELACIONAMENTOS
  @ManyToMany(() => Pessoa)
  @JoinTable()
  locatarios: Pessoa[];

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.contratos, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  proprietario: Pessoa | null;

  @ManyToOne(() => RegistroImovel, (RegistroImovel) => RegistroImovel.contratos)
  imovel: RegistroImovel;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.contratos)
  pessoa: Pessoa;
  PessoaJuridica: any;
}
