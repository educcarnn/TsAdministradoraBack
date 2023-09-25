import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { RegistroImovel } from "./imovel";
  
  @Entity()
  export class Servico {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    url: string;
  
    @ManyToOne(() => RegistroImovel, (registroImovel) => registroImovel.servicos)
    @JoinColumn({ name: "registro_imovel_id" })
    registroImovel: RegistroImovel;
  }
  