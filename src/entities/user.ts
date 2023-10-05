import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Empresa } from "./empresa/empresa";
import { IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({
    type: "enum",
    enum: ["admin", "user", "userjur"],
    default: "user",
  })
  role: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.administradores)
  @JoinColumn({ name: "empresaId" })
  empresa: Empresa;
}
