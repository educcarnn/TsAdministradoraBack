import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Contrato } from "./contrato";
import { RegistroImovel } from "./imovel";

@Entity({ name: "tabela_pessoas_fisicas_orm" })
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column("simple-array")
  funcao: string[];

  @Column("simple-array")
  formaPagamento: string[]

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  identidade: string;

  @Column({ name: "orgao_expedidor" })
  orgaoExpedidor: string;

  @Column({ name: "data_nascimento" })
  dataNascimento: Date;

  @Column()
  profissao: string;

  @Column({ name: "estado_civil" })
  estadoCivil: string;

  @Column()
  endereco: string;

  @Column()
  genero: string;

  @Column({ nullable: true, type: "varchar" }) // Use type "varchar" for the PDF path
  pdf: string | null;

  @ManyToMany(() => Contrato)
  @JoinTable()
  contratos: Contrato[];

  @ManyToMany(() => RegistroImovel)
  @JoinTable()
  propriedades: RegistroImovel[];

  isProprietario(): boolean {
    return this.funcao.includes("Proprietário");
  }

  // Função para retornar a idade com base na data de nascimento
  get idade(): number {
    const hoje = new Date();
    const dataNascimento = new Date(this.dataNascimento);
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const diffMeses = hoje.getMonth() - dataNascimento.getMonth();
    if (diffMeses < 0 || (diffMeses === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }
}
