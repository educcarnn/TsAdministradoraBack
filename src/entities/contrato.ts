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
  /*
  @ManyToMany(() => PessoaJuridica, { nullable: true })
  @JoinTable()
  proprietariosPessoaJuridica: PessoaJuridica[];
*/
  @Column()
  tipoContrato: string;

  @Column("jsonb", { nullable: true }) // Armazena os objetos como JSON
  garantia: {
    tipo: string;
    dataInicio: string;
    dataTermino: string;
    valor: number;
    seguradora: string;
    apolice: string;
    numeroParcelas: number;
    observacao: string;
  };

  @Column("jsonb", { nullable: true }) // Armazena os objetos como JSON
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
  @ManyToOne(() => Pessoa, (pessoa) => pessoa.contratosInquilinos)
  inquilino: Pessoa;

  // Relação com o proprietário no contrato
  @ManyToOne(() => Pessoa, (pessoa) => pessoa.contratosProprietarios)
  proprietario: Pessoa;

  // Relação com o imóvel alugado neste contrato
  @ManyToOne(() => RegistroImovel, (RegistroImovel) => RegistroImovel.contratos)
  imovel: RegistroImovel;
  
  /*
  @ManyToOne(() => Pessoa, (pessoa) => pessoa.contratos)
  proprietario: Pessoa[];


  @ManyToOne(() => Pessoa, (pessoa) => pessoa.contratos)
  pessoa: Pessoa;
  PessoaJuridica: any;
*/
}
