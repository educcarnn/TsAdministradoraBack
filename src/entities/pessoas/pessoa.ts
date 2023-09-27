import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Anexo } from "./anexo";
import { Inquilino } from "./inquilino";
@Entity()
export class PessoaIntermediaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string; // comum entre ambas

  @Column("text", { array: true, default: () => "ARRAY[]::text[]" })
  funcao: string[]; // comum entre ambas

  @Column({ nullable: true })
  telefoneFixo: string; // em PessoaJuridica, é apenas "telefone"

  @Column()
  telefoneCelular: string; // assumindo que é o mesmo que "telefone" de PessoaJuridica

  @Column({ nullable: true })
  email: string; // comum entre ambas

  @Column({ nullable: true })
  password?: string;

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

  @OneToMany(() => Anexo, (anexo) => anexo.pessoa)
  anexos: Anexo[];

  @Column("jsonb", { nullable: true })
  lista_email: string[]; // comum entre ambas

  @Column("jsonb", { nullable: true })
  lista_repasse: string[]; // comum entre ambas
}
