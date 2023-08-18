import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { RegistroImovel } from "./imovel";

@Entity("tabela_caracteristicas_condominio")
export class CaracteristicaCondominio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caracteristica: string;

  @ManyToMany(() => RegistroImovel, registroImovel => registroImovel.CaracteristicaCondominio)
  registrosImovel: RegistroImovel[];
}