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

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
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

  @OneToMany(
    () => RegistroImovel,
    (RegistroImovel) => RegistroImovel.proprietario
  )
  imoveisProprietarios: RegistroImovel[];

  // Relação com contratos onde a pessoa é proprietária
  @OneToMany(() => Contrato, (contrato) => contrato.proprietario)
  contratosProprietarios: Contrato[];

  // Relação com contratos onde a pessoa é inquilina
  @OneToMany(() => Contrato, (contrato) => contrato.inquilino)
  contratosInquilinos: Contrato[];
}
