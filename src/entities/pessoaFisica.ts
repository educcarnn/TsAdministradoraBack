import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { ProprietarioImovel } from "./relations/proprietarioImovel";
import { ContratoInquilino } from "./relations/contratoInquilino";
import { ContratoProprietario } from "./relations/contratoProprietario";
import { PessoaIntermediaria } from "./pessoas/pessoa";
import { Empresa } from "./empresa/empresa";
import { Fiador } from "./pessoas/fiador";
import { Inquilino } from "./pessoas/inquilino";
import { Proprietario } from "./pessoas/proprietario";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
  @OneToMany(() => Fiador, (fiador) => fiador.pessoa)
  fiador: Fiador[];

  @Column()
  cpf: string;

  @Column()
  identidade: string;

  @Column()
  orgaoExpedidor: string;

  @Column()
  dataNascimento: string;

  @Column()
  profissao: string;

  @Column()
  estadoCivil: string;

  @Column("jsonb")
  filiacao: { mae: string; pai: string };

  @Column()
  nacionalidade: string;

  @Column({ nullable: true })
  password?: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user",
    nullable: true,
  })
  role?: string;

  @Column()
  genero: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.pessoas)
  empresa: Empresa;

  @Column() // Defina a coluna da chave estrangeira
  dadosComunsId: number;

  @OneToOne(() => PessoaIntermediaria)
  @JoinColumn({ name: "dadosComunsId" }) // Referencie a coluna aqui
  dadosComuns: PessoaIntermediaria;

  /*RELACIONAMENTOS*/

  @OneToMany(() => ProprietarioImovel, (pi) => pi.pessoa)
  imoveisRelacionados: ProprietarioImovel[];

  @OneToMany(() => Inquilino, (inquilino) => inquilino.pessoa)
  inquilino: Inquilino[];

  @OneToMany(() => Proprietario, (Proprietario) => Proprietario.pessoa)
  proprietario: Proprietario[];


  @OneToMany(
    () => ContratoProprietario,
    (contratoProprietario) => contratoProprietario.proprietario
  )
  contratoProprietarioRelacoes: ContratoProprietario[];

  @OneToMany(
    () => ContratoInquilino,
    (contratoInquilino) => contratoInquilino.inquilino
  )
  contratoRelacoes: ContratoInquilino[];
}
