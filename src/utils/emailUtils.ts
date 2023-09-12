import { userRepository } from '../services/user';
import { PessoaRepository } from '../services/pessoaFisica';
import { inviteRepository } from '../services/user';

export const isEmailInUse = async (email: string) => {
    const user = await userRepository.findOne({ where: { email: email } });
    const pessoa = await PessoaRepository.findOne({ where: { email: email } });
    
    // Não incluímos convites aqui, a menos que você queira considerar convites não expirados
    // const invite = await inviteRepository.findOne({ where: { email: email, expiresAt: MoreThan(new Date()) } });

    if (user || pessoa) return true;
    return false;
};
