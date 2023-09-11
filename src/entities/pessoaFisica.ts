import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { RegistroImovel } from "./imovel";
import { Contrato } from "./contrato";
import { ProprietarioImovel } from "./relations/proprietarioImovel";
import { ContratoInquilino } from "./relations/contratoInquilino";
import { ContratoProprietario } from "./relations/contratoProprietario";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column("text", { array: true, default: () => "ARRAY[]::text[]" })
  funcao: string[];

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
  telefoneFixo: string;

  @Column()
  telefoneCelular: string;

  @Column({ nullable: true })
  email: string;

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

  @Column("jsonb", { nullable: true })
  endereco: {
    cep: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
  };

  @Column("jsonb", { nullable: true })
  dadoBancarios: {
    chavePix: string;
    banco: string;
    agencia: string;
    conta: string;
  };

  @Column("jsonb", { nullable: true })
  anexos: string[];

  /*RELACIONAMENTOS*/
  @Column("jsonb", { nullable: true })
  lista_email: string[];

  @Column("jsonb", { nullable: true })
  lista_repasse: string[];
  
  @OneToMany(() => ProprietarioImovel, pi => pi.pessoa)
  imoveisRelacionados: ProprietarioImovel[];

  // Relação com contratos onde a pessoa é proprietária
  @OneToMany(() => ContratoProprietario, contratoProprietario => contratoProprietario.proprietario)
  contratoProprietarioRelacoes: ContratoProprietario[];

  // Relação com contratos onde a pessoa é inquilina
  @OneToMany(() => ContratoInquilino, contratoInquilino => contratoInquilino.inquilino)
  contratoRelacoes: ContratoInquilino[];

}
