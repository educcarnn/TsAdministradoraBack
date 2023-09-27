import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { Pessoa } from "../pessoaFisica";
  import { RegistroImovel } from "../imovel/imovel";
  import { PessoaJuridica } from "../pessoaJuridica";
  
  @Entity()
  export class Proprietario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    status: string; // Agora "status" pode ser uma string ou nulo
  }
  