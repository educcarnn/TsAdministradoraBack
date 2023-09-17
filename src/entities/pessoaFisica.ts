import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { RegistroImovel } from "./imovel";
import { Contrato } from "./contrato";
import { ProprietarioImovel } from "./relations/proprietarioImovel";
import { ContratoInquilino } from "./relations/contratoInquilino";
import { ContratoProprietario } from "./relations/contratoProprietario";
import { PessoaIntermediaria } from "./pessoas/pessoa";
import { Empresa } from "./empresa";
import { Fiador } from "./pessoas/fiador";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToOne(() => Fiador, fiador => fiador.pessoa)
  @JoinColumn() // Isso especifica que a coluna de chave estrangeira está nesta entidade.
  fiador: Fiador;
  
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

  @ManyToOne(() => Empresa, empresa => empresa.pessoas)
  empresa: Empresa;

  @Column()  // Defina a coluna da chave estrangeira
    dadosComunsId: number;

    @OneToOne(() => PessoaIntermediaria)
    @JoinColumn({ name: "dadosComunsId" })  // Referencie a coluna aqui
    dadosComuns: PessoaIntermediaria;
  
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
