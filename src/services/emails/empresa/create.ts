import sgMail from "@sendgrid/mail";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ObterEmpresaMail } from "./functions/empresa";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const conviteData = {
      ...data,
      empresa: data.empresa,
      endereco: data.endereco,
      telefone: data.telefone,
      email: data.email,
    };

    const token = jwt.sign(conviteData, process.env.JWT_SECRET as string, {
      expiresIn: "3h",
    });

    let baseActivationURL =
      "http://localhost:3001/cadastrar/empresa";

    const activationLink = `${baseActivationURL}?token=${token}&empresa=${data.empresa}&telefone=${data.telefone}&endereco=${data.endereco}&email=${data.email}`;

    const msg = {
      to: data.email,
      from: "tsadmsistema@gmail.com",
      subject: `Cadastro para ${data.empresa}`,
      text: `Cadastro de administração para empresa ${data.empresa}. Clique no link a seguir para preencher sua senha e confirmar o cadastro: ${activationLink}`,
      html: `<p>Cadastro de administração para empresa ${data.empresa}. Clique no <a href="${activationLink}">link</a> para preencher sua senha e confirmar o cadastro. 
      O link será válido por 3 horas, informações da empresa: ${data.empresa}, Endereço ${data.endereco}, Telefone: ${data.telefone}, E-mail do administrador principal ${data.email} </p>`,
    };

    await sgMail.send(msg);

    if (baseActivationURL) {
      res.status(200).json({
        message: "Cadastro de empresa feito com sucesso",
        empresaId: data.empresa,
      });
    } else {
      res.status(400).json({ message: "Tipo de pessoa inválido." });
    }
  } catch (error) {
    console.error("Erro detalhado:", error);

    if ((error as Error).message === "Role desconhecida") {
      res.status(400).json({ message: "Role desconhecida" });
    } else {
      res.status(400).json({ message: "Falha ao enviar o convite" });
    }
  }
};
