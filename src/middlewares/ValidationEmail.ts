import { NextFunction, Request, Response } from "express";

export const ValidationEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    // Use a biblioteca de validação para validar o email.
    // Aqui estamos apenas verificando a presença.
    if (email) {
        next();
    } else {
        res.status(400).send("E-mail inválido");
    }
};