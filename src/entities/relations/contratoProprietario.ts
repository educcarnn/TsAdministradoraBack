import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from "typeorm";
  import { Contrato } from "../contrato";
  import { PessoaFisica } from "../pessoaFisica";
  
  @Entity()
  export class ContratoProprietario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    percentual: number;
  
    @ManyToOne(() => Contrato, contrato => contrato.proprietarioRelacoes)
    contrato: Contrato;
  
    @ManyToOne(() => PessoaFisica, PessoaFisica => PessoaFisica.contratoProprietarioRelacoes)
    proprietario: PessoaFisica;
  }