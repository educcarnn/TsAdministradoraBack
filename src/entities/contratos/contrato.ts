import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
} from "typeorm";


import { PessoaJuridica } from "../pessoaJuridica";
import { RegistroImovel } from "../imovel/imovel";
import { ContratoInquilino } from "../relations/contratoInquilino";
import { ContratoProprietario } from "../relations/contratoProprietario";

@Entity()
export class Contrato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipoContrato: string;

  @Column("jsonb", { nullable: true }) 
  garantia: {
    tipo: string;
    dataInicio: string;
    dataTermino: string;
    valor: number;
    seguradora: string;
    apolice: string;
    numeroParcelas: number;
    observacao: string;
  };

  @Column("jsonb", { nullable: true }) 
  detalhesContrato: {
    dataInicio: string;
    dataTermino: string;
    valor: number;
    contrato: string;
    seguradora: string;
    apolice: string;
    numeroParcelas: number;
    observacao: string;
  };

  // RELACIONAMENTOS
  @OneToMany(() => ContratoInquilino, contratoInquilino => contratoInquilino.contrato)
  inquilinoRelacoes: ContratoInquilino[];

  // Relação com o proprietário no contrato
  @OneToMany(() => ContratoProprietario, contratoProprietario => contratoProprietario.contrato)
  proprietarioRelacoes: ContratoProprietario[];

  // Relação com o imóvel alugado neste contrato
  @ManyToOne(() => RegistroImovel, (RegistroImovel) => RegistroImovel.contratos)
  imovel: RegistroImovel;
  

}
