import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from "typeorm";
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

  @Column("jsonb") // Armazena os objetos como JSON
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

  @Column("jsonb") // Armazena os objetos como JSON
  detalhesContrato: {
    dataInicio: string;
    dataTermino: string;
    valor: number;
    seguradora: string;
    apolice: string;
    numeroParcelas: number;
    observacao: string;
  };
  PessoaJuridica: any;

  // RELACIONAMENTOS 
}
