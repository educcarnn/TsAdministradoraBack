/*
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Contract } from "./contrato";

@Entity({ name: "tabela_pessoas_fisicas" })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column("simple-array")
  funcao: string[];

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  identidade: string;

  @Column({ name: "orgao_expedidor" })
  orgaoExpedidor: string;

  @Column({ name: "data_nascimento" })
  dataNascimento: Date;

  @Column()
  profissao: string;

  @Column({ name: "estado_civil" })
  estadoCivil: string;

  // ... outras colunas

  @Column()
  endereco: string;

  @Column()
  genero: string;

  @Column({ nullable: true })
  pdf: string | null;

  @OneToMany(() => Contrato, (contrato) => Contract.locatario)
  contratos: Contrato[];

  // ... outras relações

  // Função para retornar a idade com base na data de nascimento
  get idade(): number {
    const today = new Date();
    const birthDate = new Date(this.dataNascimento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}

*/