import { userRepository } from '../services/user';
import { PessoaIntermediariaRepository } from '../services/pessoaFisica';

export const isEmailInUse = async (email: string): Promise<boolean> => {
    const pessoaIntermediaria = await PessoaIntermediariaRepository.findOne({ where: { email: email } });
    
    // Se encontrou na tabela intermediária, então o email está em uso.
    if (pessoaIntermediaria) {
        return true;
    }

    const user = await userRepository.findOne({ where: { email: email } });

    // Verifique na tabela de usuários se o email está em uso.
    return !!user;
};
