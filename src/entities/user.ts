import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
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
        enum: ["admin", "user"],
        default: "user"
    })
    role: string;
}
