import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../interface/user';

export const verifyAuth = (req: Request & { user?: User }, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: "Token não fornecido" });
        return;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        res.status(401).json({ message: "Erro no token" });
        return;
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        res.status(401).json({ message: "Formato de token malformado" });
        return;
    }

    const secret = process.env.JWT_SECRET || "chave_secreta_para_teste";

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token inválido" });
            return;
        }

        req.user = decoded as User;

        next();
    });
};
