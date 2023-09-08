// relations/ContratoInquilino.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column
  } from "typeorm";
  import { Pessoa } from "../pessoaFisica";
  import { Contrato } from "../contrato";
  
  @Entity()
  export class ContratoInquilino {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Pessoa, (pessoa) => pessoa.contratosInquilinos)
    inquilino: Pessoa;
  
    @ManyToOne(() => Contrato, (contrato) => contrato.inquilinos)
    contrato: Contrato;
  
    @Column({ type: "decimal", precision: 5, scale: 2 })
    percentual: number; // Percentual do inquilino no contrato.
  }
  