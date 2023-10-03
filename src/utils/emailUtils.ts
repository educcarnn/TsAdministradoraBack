import { userRepository } from '../services/user/user';
import { PessoaIntermediariaRepository } from '../services/pessoas/pessoaFisica';

export const isEmailInUse = async (email: string): Promise<boolean> => {
    const pessoaIntermediaria = await PessoaIntermediariaRepository.findOne({ where: { email: email } });
    

    if (pessoaIntermediaria) {
        return true;
    }

    const user = await userRepository.findOne({ where: { email: email } });

    
    return !!user;
};
