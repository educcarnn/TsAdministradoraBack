import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    JoinColumn
  } from 'typeorm';
import { Pessoa } from '../pessoaFisica';
import { RegistroImovel } from '../imovel';
  
  @Entity()
  export class ProprietarioImovel {
      @PrimaryGeneratedColumn()
      id: number;
  
      @ManyToOne(() => Pessoa, Pessoa => Pessoa.imoveisRelacionados)
      @JoinColumn({ name: 'pessoaId' }) 
      pessoa: Pessoa;
      
      @ManyToOne(() => RegistroImovel, registroImovel => registroImovel.imoveisProprietarios)
      @JoinColumn({ name: 'registroImovelId' })
      registroImovel: RegistroImovel;
  
      @Column({ type: 'float' })
      percentualPropriedade: number;
  }