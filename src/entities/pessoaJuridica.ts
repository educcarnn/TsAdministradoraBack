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
import { Contrato } from "./contratos/contrato";
import { RegistroImovel } from "./imovel/imovel";
import { PessoaIntermediaria } from "./pessoas/pessoa";
import { Empresa } from "./empresa/empresa";
import { Inquilino } from "./pessoas/inquilino";
import { ProprietarioImovel } from "./relations/proprietarioImovel";
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

  @Column()
  nomeFantasia: string;

  @Column()
  dataAberturaEmpresa: string;

  @Column()
  novoSocioAdministrador: string;

  @Column({ nullable: true })
  password?: string;

  @Column() // Defina a coluna da chave estrangeira
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


  /*
  @OneToMany(() => Contrato, contrato => contrato.PessoaJuridica, {nullable: true})
  contratos: Contrato[];

  */
}
