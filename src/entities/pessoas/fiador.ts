import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne
} from "typeorm";
import { PessoaFisica } from "../pessoaFisica";
import { RegistroImovel } from "../imovel";

@Entity()
export class Fiador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numeroMatriculaRGI: string;

    @OneToOne(() => PessoaFisica)
    pessoa: PessoaFisica;

    @ManyToOne(() => RegistroImovel)
    imovelComoFianca: RegistroImovel;

}
