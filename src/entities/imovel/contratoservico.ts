import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { RegistroImovel } from "./imovel";
  
  @Entity()
  export class ContratoServico {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    url: string;
  
    @ManyToOne(() => RegistroImovel, (registroImovel) => registroImovel.servicocontratos)
    @JoinColumn({ name: "registro_imovel_id" })
    registroImovel: RegistroImovel;
  }
  