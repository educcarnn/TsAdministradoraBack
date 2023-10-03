import { createInvite } from "../user/user";
import sgMail from "@sendgrid/mail";
import { Request, Response } from "express";

import * as jwt from "jsonwebtoken";
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export const inviteAdmin = async (req: Request, res: Response) => {
  try {
    const newInvite = await createInvite(req.body);

    const token = jwt.sign(
      { userId: newInvite.id, role: newInvite.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "3h" }
    );

    let baseActivationURL = "";

    switch (newInvite.role) {
      case "admin":
        baseActivationURL = "https://tsadministradora.com.br/invite-admin";
        break;
      case "user":
        baseActivationURL =
          "https://tsadministradora.com.br/clientes-pessoa-fisica";
        break;
      case "Jurídica":
        baseActivationURL =
          "https://tsadministradora.com.br/clientes-pessoa-juridica";
        break;
      default:
        baseActivationURL = "";
        break;
    }

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
