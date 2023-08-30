import { Request, Response } from "express";
import * as UserService from "../../services/user";
import * as PessoaService from "../../services/pessoaFisica"; // Ajuste o caminho conforme necessário
import * as jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { createInvite } from "../../services/user";
import { Pessoa } from "../../entities/pessoaFisica";
import { User } from "../../entities/user";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export const inviteAdmin = async (req: Request, res: Response) => {
  try {
    const newInvite = await createInvite(req.body);

    const token = jwt.sign(
      { userId: newInvite.id, role: newInvite.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "3h" }
    );

    const baseActivationURL =
      newInvite.role === "admin"
        ? "https://tsadministradora.com.br/invite-admin"
        : "https://tsadministradora.com.br/clientes-pessoa-fisica";
    const activationLink = `${baseActivationURL}?token=${token}`;

    const msg = {
      to: newInvite.email,
      from: "tsadmsistema@gmail.com",
      subject: "Ative sua conta - Ts Administradora",
      text: `Olá! Ative sua conta e defina sua senha clicando no seguinte link: ${activationLink}`,
      html: `<p>Olá! Ative sua conta e defina sua senha clicando no seguinte <a href="${activationLink}">link</a>. A partir do momento que foi enviado o link terá 3 horas de acesso, passado esse horário, só poderá ser feito o cadastro mediante a reenvio</p>`,
    };

    await sgMail.send(msg);
    res.status(201).json({ message: "Convite enviado!" });
  } catch (error) {
    console.error("Erro detalhado:", error);

    if ((error as Error).message === "Role desconhecida") {
      res.status(400).json({ message: "Role desconhecida" });
    } else {
      res
        .status(400)
        .json({ message: "E-mail em uso ou falha ao enviar o convite" });
    }
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "E-mail em uso" });
  }
};


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const loginUser = async (req: Request, res: Response) => {
  try {
    let user: User | Pessoa | null | undefined;

      user = await UserService.findUserByEmail(req.body.email);

      if (!user) {
        user = await PessoaService.findPessoaByEmail(req.body.email);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
    }

      const isValidPassword = user instanceof User
          ? await UserService.checkPassword(req.body.password, user.password as string)
          : await PessoaService.checkPassword(req.body.password, user.password as string);

      if (!isValidPassword) {
          return res.status(401).json({ message: "Senha incorreta." });
      }

      // Geração do token JWT
     const tokenExpiration = 24 * 60 * 60; // 24 horas em segundos

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role || "user", // Se não tiver role, assume "user" para Pessoa
      },
      process.env.JWT_SECRET as string,
      { expiresIn: tokenExpiration }
    );

    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + tokenExpiration);

    // Retornando o token, a role e a data de expiração no corpo da resposta
    res.status(200).json({
      message: "Login bem-sucedido!",
      token: token,
      role: user.role || "user",
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
