import { NextFunction, Response, Request as ExpressRequest } from "express";
import { IUser } from "./../interface/user"; // Importando a interface IUser

// Criando uma nova interface que estende a Request do Express para incluir a propriedade user.
interface RequestWithUser extends ExpressRequest {
    user?: IUser;
}

export const ValidationStatusUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        // Lógica de validação de status
        if (user.role !== "admin") {
            next();
        } else {
            res.status(401).send("Status inválido");
        }
    } else {
        res.status(401).send("Usuário não autenticado");
    }
};
