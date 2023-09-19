import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { PessoaIntermediaria } from "./pessoa";
  
  @Entity()
  export class Anexo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    url: string;
  
    @ManyToOne(() => PessoaIntermediaria, pessoa => pessoa.anexos)
    @JoinColumn({ name: "pessoa_id" })
    pessoa: PessoaIntermediaria;
  }
  