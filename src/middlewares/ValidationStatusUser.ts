/*
import { NextFunction, Request, Response } from "express";


export const ValidationStatusUser = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;  // Aqui, "as any" é usado para supor que `req.user` pode ter qualquer formato. Idealmente, você deve definir uma interface para "user".

    if (user) {
        // Logica de validação de status
        if (user.status === "valid") {
            next();
        } else {
            res.status(401).send("Status inválido");
        }
    } else {
        res.status(401).send("Usuário não autenticado");
    }
};
