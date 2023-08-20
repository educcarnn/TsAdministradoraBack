import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Pessoa } from "./pessoaFisica";
import { Contrato } from "./contrato";
import { CaracteristicaCondominio } from "./caracteristicasCondominio";
import { CaracteristicaImovel } from "./caracteristicasImovel";
import { PessoaJuridica } from "./pessoaJuridica";


@Entity("tabela_registro_imovel_orm")
export class RegistroImovel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_imovel: string;

  @Column()
  genero_imovel: string;

  @Column()
  tipo_construcao: string;

  @Column({ type: "int" })
  numero_quartos: number;

  @Column({ type: "int" })
  numero_suites: number;

  @Column({ type: "int" })
  numero_banheiros: number;

  @Column({ type: "int" })
  numero_vagas: number;

  @Column({ type: "float" })
  area_util: number;

  @Column({ type: "float" })
  area_total: number;

  @Column()
  tipo_negociacao: string;

  @Column({ type: "numeric", nullable: true })
  valor_venda: number;

  @Column({ type: "numeric", nullable: true })
  taxa_intermediacao: number;

  @Column({ type: "numeric", nullable: true })
  valor_aluguel: number;

  @Column({ type: "numeric", nullable: true })
  taxa_administracao: number;

  @Column({ type: "numeric", nullable: true })
  taxa_locacao: number;

  @Column()
  tipo_iptu: string;

  @Column({ type: "int", nullable: true })
  numero_matricula_iptu: number;

  @Column({ type: "numeric", nullable: true })
  valor_mensal_iptu: number;

  @Column()
  tipo_condominio: string;

  @Column( {nullable: true})
  nome_condominio: string;

  @Column({ nullable: true })
  nome_administradora: string;

  @Column({ nullable: true })
  razao_social_condominio: string;

  @Column({ length: 20, nullable: true })
  cnpj_condominio: string;

  @Column({ nullable: true })
  site_condominio: string;

  @Column({ nullable: true })
  login_condominio: string;

  @Column({ nullable: true })
  senha_condominio: string;

  @Column({ length: 20, nullable: true })
  telefone_fixo_condominio: string;

  @Column({ length: 20, nullable: true })
  telefone_celular_condominio: string;

  @Column({ type: "numeric", nullable: true })
  valor_mensal_condominio: number;


  @Column({ type: "numeric", nullable: true })
  percentual: number;

  @Column("varchar", { array: true })
  novos_proprietarios: string[];

  @Column({ type: "int"})
  cep: number;

  @Column()
  endereco: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column({ length: 10 })
  estado: string;

  @Column({ type: "int", nullable: true })
  andar: number;

  @Column({ type: "int", nullable: true })
  numero: number;

  @Column('text', { array: true, nullable: true })
  fotos: string[];

  /*Relacionamentos*/
  @ManyToMany(() => Contrato, { nullable: true})
  @JoinTable()
  contratos: Contrato[];  

  @ManyToMany(() => Pessoa, { nullable: true})
  @JoinTable()
  proprietarios: Pessoa[];

  @ManyToMany(() => PessoaJuridica, { nullable: true})
  @JoinTable()
  proprietariosPessoaJuridica: PessoaJuridica[];

  @ManyToMany(() => CaracteristicaCondominio)
  @JoinTable()
  CaracteristicaCondominio: CaracteristicaCondominio[];

  @ManyToMany(() => CaracteristicaImovel)
  @JoinTable()
  caracteristicas_imovel: CaracteristicaImovel[];
  Pessoa: any;
  PessoaJuridica: any;

}
