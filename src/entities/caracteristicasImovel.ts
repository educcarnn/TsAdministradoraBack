import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { RegistroImovel } from "./imovel";

@Entity("tabela_caracteristicas_imovel")
export class CaracteristicaImovel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caracteristica: string;

  @ManyToOne(() => RegistroImovel, registroImovel => registroImovel.caracteristicas_imovel)
  registroImovel: RegistroImovel;
}
