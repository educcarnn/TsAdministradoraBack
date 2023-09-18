import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Contrato } from "./contrato";
import { RegistroImovel } from "./imovel";
import { PessoaIntermediaria } from "./pessoas/pessoa";
import { Empresa } from "./empresa";
@Entity()
export class PessoaJuridica {
  @PrimaryGeneratedColumn()
  id: number;

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

  /*RELACIONAMENTOS*/

  // Seus outros relacionamentos podem permanecer aqui

  /*
  @OneToMany(() => Contrato, contrato => contrato.PessoaJuridica, {nullable: true})
  contratos: Contrato[];

  @OneToMany(() => RegistroImovel, (imovel) => imovel.PessoaJuridica, { nullable: true })
  imoveis: RegistroImovel[];
  */
}
