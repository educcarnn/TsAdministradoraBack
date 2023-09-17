import { userRepository } from '../services/user';
<<<<<<< HEAD
import { PessoaIntermediariaRepository } from '../services/pessoas/pessoaFisica';

export const isEmailInUse = async (email: string): Promise<boolean> => {
    const pessoaIntermediaria = await PessoaIntermediariaRepository.findOne({ where: { email: email } });
    

    if (pessoaIntermediaria) {
        return true;
    }

    const user = await userRepository.findOne({ where: { email: email } });

    // Verifique na tabela de usuários se o email está em uso.
    return !!user;
=======
import { PessoaRepository } from '../services/pessoaFisica';
import { inviteRepository } from '../services/user';

export const isEmailInUse = async (email: string) => {
    const user = await userRepository.findOne({ where: { email: email } });
    const pessoa = await PessoaRepository.findOne({ where: { email: email } });
    
    // Não incluímos convites aqui, a menos que você queira considerar convites não expirados
    // const invite = await inviteRepository.findOne({ where: { email: email, expiresAt: MoreThan(new Date()) } });

    
    if (user || pessoa) return true;
    return false;
>>>>>>> 208ca8ccfc7f4c5f21140c698f757f6f45c44fe8
};
