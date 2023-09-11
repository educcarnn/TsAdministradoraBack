
import { userRepository } from '../services/user';
import { PessoaRepository } from '../services/pessoaFisica';

export const isEmailInUse = async (email: string): Promise<boolean> => {
    const user = await userRepository.findOne({ where: { email: email } });
    const pessoa = await PessoaRepository.findOne({ where: { email: email } });
    
    return !!(user || pessoa);
};