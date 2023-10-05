import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { PessoaIntermediaria } from "./pessoas/pessoa";
import { Empresa } from "./empresa/empresa";
import { Inquilino } from "./pessoas/inquilino";
import { ProprietarioImovel } from "./relations/proprietarioImovel";
import { Socio } from "./pessoas/juridica/socio";

@Entity()

export class PessoaJuridica {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Inquilino, (pi) => pi.pessoa)
  inquilino: Inquilino[];

  @Column()
  cnpj: string;

  @Column()
  razaoSocial: string;
  
  @Column({
    type: "enum",
    enum: ["admin", "user", "userjur"],
    default: "userjur",
    nullable: true,
  })
  role?: string;


  @Column()
  nomeFantasia: string;

  @Column()
  dataAberturaEmpresa: string;

  @OneToMany(() => Socio, (socio) => socio.pessoaJuridica, { cascade: true })
  socios: Socio[];

  @Column()
  password: string;

  @Column() 
  dadosComunsId: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.pessoaJuridicas)
  empresa: Empresa;

  @OneToOne(() => PessoaIntermediaria)
  @JoinColumn()
  dadosComuns: PessoaIntermediaria; // Este campo contém todas as informações comuns

  @OneToMany(() => ProprietarioImovel, (imovel) => imovel.pessoaJuridica, {
    nullable: true,
  })
  imoveisRelacionadosJur: ProprietarioImovel[];
  
  nome: string;


  /*
  @OneToMany(() => Contrato, contrato => contrato.PessoaJuridica, {nullable: true})
  contratos: Contrato[];

  */
}
