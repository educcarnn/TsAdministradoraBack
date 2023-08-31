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

export const isAdminOuUser = (req: Request & { user?: User }, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { role?: string };

        if (decoded.role && decoded.role === "admin" || decoded.role === "user") {
            next();
        } else {
            res.status(403).json({ message: "Acesso negado. Permissão de admin necessária." });
        }

    } catch (err) {
        res.status(403).json({ message: "Token inválido." });
    }
};