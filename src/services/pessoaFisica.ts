import { Repository } from 'typeorm';
import { Pessoa } from '../entities/pessoaFisica';
import { AppDataSource } from '../data-source';

export const PessoaRepository: Repository<Pessoa> = AppDataSource.getRepository(Pessoa);

export const cadastrarPessoa = async (data: Pessoa): Promise<void> => {
  await PessoaRepository.save(data);
};

export const requeryPessoas = async () => {
  const requery = await PessoaRepository.find({
    relations: {
      imoveisProprietarios: true,
      contratosProprietarios: true,
      contratosInquilinos: true,
    },
  });
  return requery;
};

export const obterTodasPessoas = async (): Promise<Pessoa[]> => {
  return PessoaRepository.find();
};

export const obterPessoaPorId = async (id: number): Promise<Pessoa | undefined> => {
  try {
    const getPessoa = await requeryPessoas();
    const pessoa = await PessoaRepository.findOne({ where: { id: id } });

    if (pessoa) {
      // Procura a pessoa nas informações carregadas
      const pessoaFind = getPessoa.find(item => item.id === pessoa.id);

      if (pessoaFind) {
        return pessoaFind;
      }
    }

    return undefined;
  } catch (error) {
    console.error('Erro ao obter Pessoa por ID:', error);
    return undefined;
  }
}


export const deletarPessoaPorId = async (id: number): Promise<void> => {
  await PessoaRepository.delete(id);
};

export const atualizarPessoaPorId = async (id: number, data: Pessoa): Promise<void> => {
  await PessoaRepository.update(id, data);
};