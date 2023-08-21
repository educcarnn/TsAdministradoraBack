/*
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../entities/user';
import { generateToken } from '../../utils/jwtUtils';
import { hashPassword, comparePasswords } from '../../utils/jwtUtils';
import { AppDataSource } from '../../data-source';

const userRepository: Repository<User> = AppDataSource.getRepository(UserRepository);
const userService = new UserService(userRepository);

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await userService.findByUsername(username);

    if (!user || !comparePasswords(password, user.password)) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const token = generateToken({ id: user.id, admin: user.admin });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

export const cadastro = async (req: Request, res: Response): Promise<void> => {
  const { username, password, admin } = req.body;

  try {
    const newUser = new User();
    newUser.username = username;
    newUser.password = hashPassword(password);
    newUser.admin = admin || false;

    await userService.createUser(newUser);

    res.json({ msg: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};
*/