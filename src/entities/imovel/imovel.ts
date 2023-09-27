import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Empresa } from "../empresa/empresa";
import { Contrato } from "../contratos/contrato";
import { ProprietarioImovel } from "../relations/proprietarioImovel";
import { Anexo } from "../pessoas/anexo";
import { Foto } from "./fotos";
import { Servico } from "./servico";
import { Inquilino } from "../pessoas/inquilino";

@Entity()
export class RegistroImovel {
  @PrimaryGeneratedColumn()
  id: number;



  @Column()
  tipoImovel: string;

  @Column()
  generoImovel: string;

  @Column("jsonb", { nullable: true })
  caracteristicas: {
    tipoConstrucao: string;
    numeroQuartos: number;
    numeroSuites: number;
    numeroBanheiros: number;
    numeroVagas: number;
    areaUtil: number;
    areaTotal: number;
  };

  @Column("jsonb", { nullable: true })
  negociacao: {
    tipo: string;
    valores: {
      valorVenda: number;
      taxaIntermediacao: number;
      valorAluguel: number;
      taxaAdministracao: number;
      taxaLocacao: number;
      vendaealuguelVenda: number;
      vendaealuguelAluguel: number;
      vendaealuguelTaxa: number;
    };
  };

  @Column()
  tipoIptu: string;

  @Column("jsonb", { nullable: true })
  iptu: {
    numero_matricula_iptu: number;
    valorMensal: number;
  };

  @Column()
  tipoCondominio: string;

  @Column("jsonb", { nullable: true })
  condominio: {
    nome_condominio: string;
    nome_administradora: string;
    razao_social: string;
    cnpj: string;
    site: string;
    login: string;
    senha: string;
    telefone_fixo: string;
    telefone_celular: string;
    valor_mensal: number;
  };

  @Column("jsonb", { nullable: true })
  localizacao: {
    cep: number;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    andar: number;
    numero: number;
  };


  @Column("text", { array: true, nullable: true })
  caracteristicas_imovel: string[];

  @Column("text", { array: true, nullable: true })
  caracteristicas_condominio: string[];

  @Column("jsonb", { nullable: true })
  anuncio: {
    title: string;
    contrato: string;
    description: string;
  };

  @OneToMany(() => Anexo, anexo => anexo.imovel, {nullable: true })
  anexos: Anexo[];

  @OneToMany(() => Foto, (foto) => foto.registroImovel, {nullable: true })
  fotos: Foto[];

  @OneToMany(() => Servico, (Servico) => Servico.registroImovel, {nullable: true })
  servicos: Servico[];

  @OneToMany(() => ProprietarioImovel, (pi) => pi.registroImovel)
  imoveisProprietarios: ProprietarioImovel[];

  @OneToMany(() => ProprietarioImovel, (pi) => pi.registroImovel)
  imoveisProprietariosJur: ProprietarioImovel[];

  @OneToMany(() => Inquilino, (inquilino) => inquilino.registroImovel)
  inquilinos: Inquilino[]; // Adiciona a relação com Inquilino
  
  @OneToMany(() => Contrato, (contrato) => contrato.imovel)
  contratos: Contrato[];
  proprietarios: any;
}
