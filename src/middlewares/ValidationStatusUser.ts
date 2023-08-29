import { NextFunction, Request, Response } from "express";
import { User } from "../interface/user";
import jwt from 'jsonwebtoken';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { role?: string };

        if (decoded.role && decoded.role === "admin") {
            next();
        } else {
            res.status(403).json({ message: "Acesso negado. Permissão de admin necessária." });
        }

    } catch (err) {
        res.status(403).json({ message: "Token inválido." });
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