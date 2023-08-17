/*

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Person } from "./Person";
import { Property } from "./Property";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, person => person.contracts)
  pessoa: Person;

  @ManyToOne(() => Property, property => property.contracts)
  imovel: Property;

  @ManyToOne(() => Person, person => person.contracts)
  proprietario: Person;

  @Column()
  tipoContrato: string;

  @ManyToMany(() => Person)
  @JoinTable()
  locatarios: Person[];

  @Column()
  garantia: string;

  @Column()
  dataInicio: Date;

  @Column()
  dataTermino: Date;

  @Column()
  valor: number;

  @Column()
  seguradora: string;

  @Column()
  apolice: string;

  @Column()
  numeroParcelas: number;

  @Column()
  observacao: string;

  // ... outras colunas e relacionamentos

  // Construtor e métodos adicionais aqui
}
