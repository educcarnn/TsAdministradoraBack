import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { RegistroImovel } from "./imovel";
import { Contrato } from "./contrato";
import { ProprietarioImovel } from "./relations/proprietarioImovel";
import { ContratoInquilino } from "./relations/contratoInquilino";
import { ContratoProprietario } from "./relations/contratoProprietario";
import { PessoaIntermediaria } from "./pessoas/pessoa";

@Entity()
export class PessoaFisica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

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

  // Relação OneToOne com a tabela intermediária
  @OneToOne(() => PessoaIntermediaria)
  @JoinColumn()  // Esta anotação indica que a entidade Pessoa possui a chave estrangeira
  dadosComuns: PessoaIntermediaria;  // Este campo contém todas as informações comuns

  /*RELACIONAMENTOS*/
  
  @OneToMany(() => ProprietarioImovel, pi => pi.pessoa)
  imoveisRelacionados: ProprietarioImovel[];

  // Relação com contratos onde a pessoa é proprietária
  @OneToMany(() => ContratoProprietario, contratoProprietario => contratoProprietario.proprietario)
  contratoProprietarioRelacoes: ContratoProprietario[];

  // Relação com contratos onde a pessoa é inquilina
  @OneToMany(() => ContratoInquilino, contratoInquilino => contratoInquilino.inquilino)
  contratoRelacoes: ContratoInquilino[];

}
