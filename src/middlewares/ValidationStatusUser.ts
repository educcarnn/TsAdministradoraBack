import { NextFunction, Request, Response } from "express";
import { User } from "../interface/user";

export const verificarAdmin = (req: Request & { user?: User }, res: Response, next: NextFunction): void => {
    if (req.user) {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Acesso negado: usuário não é admin" });
        }
    } else {
        res.status(401).json({ message: "Usuário não autenticado" });
    }
};

export const verificarAdminOuUser = (req: Request & { user?: User }, res: Response, next: NextFunction): void => {
    if (req.user) {
        console.log(req.user);  // Log do user para verificar o conteúdo
        if (req.user.role === 'admin' || req.user.role === 'user') {
            next();
        } else {
            console.log('Role não é nem admin nem user'); // Log para diagnóstico
            res.status(403).json({ message: "Acesso negado: permissão insuficiente" });
        }
    } else {
        console.log('Usuário não autenticado'); // Log para diagnóstico
        res.status(401).json({ message: "Usuário não autenticado" });
    }
};