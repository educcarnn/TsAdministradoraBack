import sgMail from "@sendgrid/mail";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ObterEmpresaMail } from "./functions/empresa";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export const inviteAdmin = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const conviteData = {
      ...data,
      empresaId: data.empresaId,
    };

    const token = jwt.sign(conviteData, process.env.JWT_SECRET as string, {
      expiresIn: "3h",
    });


    const empresa = await ObterEmpresaMail(data.empresaId);

    if (!empresa) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    
    const nomeEmpresa = empresa.nome;
    

    let baseActivationURL = "";

    switch (data.role) {
      case "admin":
        baseActivationURL = "https://tsadministradora.com.br/invite-admin";
        break;
      case "user":
        baseActivationURL =
          "https://tsadministradora.com.br/clientes-pessoa-fisica";
        break;
      case "userjur":
        baseActivationURL =
          "https://tsadministradora.com.br/clientes-pessoa-juridica";
        break;
      default:
        baseActivationURL = "";
        break;
    }

    const activationLink = `${baseActivationURL}?token=${token}&empresaId=${data.empresaId}`;
  
  
    console.log()
    const msg = {
      to: data.email,
      from: "tsadmsistema@gmail.com",
      subject: `Convite para ${nomeEmpresa}`,
      text: `Você foi convidado para se juntar à ${nomeEmpresa}. Clique no link a seguir para preencher seus dados: ${activationLink}`,
      html: `<p>Você foi convidado para se juntar à ${nomeEmpresa}. Clique no <a href="${activationLink}">link</a> a seguir para preencher seus dados. O link será válido por 3 horas, para função de ${data.role} em ${nomeEmpresa} </p>`,
    };

    await sgMail.send(msg);

    if (baseActivationURL) {
      res.status(200).json({
        message: "Convite enviado com sucesso",
        empresaId: data.empresaId,
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
