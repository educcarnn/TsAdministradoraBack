import { Request, Response } from "express";
import * as UserService from "../../services/user/user";
import * as PessoaService from "../../services/pessoas/pessoaFisica";
import * as PessoaJuridicaService from "../../services/pessoas/pessoaJuridica";
import * as jwt from "jsonwebtoken";
import { Pessoa } from "../../entities/pessoaFisica";
import { User } from "../../entities/user";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { PessoaJuridica } from "../../entities/pessoaJuridica";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "E-mail em uso" });
  }
};

export const UserRepository: Repository<User> =
  AppDataSource.getRepository(User);

export const loginUser = async (req: Request, res: Response) => {
  try {
    let user: User | Pessoa | PessoaJuridica | null | undefined;

    user = await UserService.findUserByEmail(req.body.email);

    if (!user) {
      user = await PessoaService.findPessoaByEmail(req.body.email);

      if (!user) {
        user = await PessoaJuridicaService.findPessoaJuridicaByEmail(
          req.body.email
        );

        if (!user) {
          return res.status(404).json({ message: "Usuário não encontrado." });
        }
      }
    }

    const isValidPassword =
      user instanceof User
        ? await UserService.checkPassword(
            req.body.password,
            user.password as string
          )
        : user instanceof Pessoa
        ? await PessoaService.checkPassword(
            req.body.password,
            user.password as string
          )
        : await PessoaJuridicaService.checkPassword(
            req.body.password,
            user.password as string
          );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const tokenExpiration = 24 * 60 * 60;

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role || "user",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: tokenExpiration }
    );

    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + tokenExpiration);

    const userData = await UserRepository.createQueryBuilder("user")
      .where("user.id = :userId", { userId: user.id })
      .leftJoinAndSelect("user.empresa", "empresa")
      .getOne();

    const empresaId = userData?.empresa?.id || null;

    res.status(200).json({
      message: "Login bem-sucedido!",
      token: token,
      role: user.role || "user",
      empresaId: empresaId,
      tokenExpiresAt: expirationDate,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no login" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10); // Convertendo para número
    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID do usuário inválido." });
    }
    await UserService.updateUserById(userId, req.body);
    res.status(200).json({ message: "Usuário atualizado com sucesso." });
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar usuário" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    await UserService.deleteUserById(id);
    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(400).json({ message: "Erro ao deletar usuário" });
  }
};
