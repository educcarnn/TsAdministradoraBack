import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Empresa } from "./empresa";
import { IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user",
  })
  role: string;

  @ManyToOne(() => Empresa, empresa => empresa.administradores)
  @JoinColumn({ name: "empresaId" })  // A coluna que vai guardar o ID da empresa no User
  empresaAdministrada: Empresa;
}
