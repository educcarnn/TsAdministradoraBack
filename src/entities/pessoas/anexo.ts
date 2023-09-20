import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { PessoaIntermediaria } from "./pessoa";
import { RegistroImovel } from "../imovel";

  @Entity()
  export class Anexo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    url: string;
  
    @ManyToOne(() => PessoaIntermediaria, pessoa => pessoa.anexos)
    @JoinColumn({ name: "pessoa_id" })
    pessoa: PessoaIntermediaria;

    @ManyToOne(() => RegistroImovel, RegistroImovel => RegistroImovel.anexos)
    @JoinColumn({ name: "imovel_id" })
    imovel: RegistroImovel;
  }
  