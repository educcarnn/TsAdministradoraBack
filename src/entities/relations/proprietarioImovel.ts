import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    JoinColumn
  } from 'typeorm';
import { PessoaFisica } from '../pessoaFisica';
import { RegistroImovel } from '../imovel';
  
  @Entity()
  export class ProprietarioImovel {
      @PrimaryGeneratedColumn()
      id: number;
  
      @ManyToOne(() => PessoaFisica, PessoaFisica => PessoaFisica.imoveisRelacionados)
      @JoinColumn({ name: 'pessoaId' }) 
      pessoa: PessoaFisica;
      
      @ManyToOne(() => RegistroImovel, registroImovel => registroImovel.imoveisProprietarios)
      @JoinColumn({ name: 'registroImovelId' })
      registroImovel: RegistroImovel;
  
      @Column({ type: 'float' })
      percentualPropriedade: number;
  }