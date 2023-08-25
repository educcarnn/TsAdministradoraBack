// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
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

    // Certifique-se de definir sua chave secreta em algum lugar seguro!
    const secret = process.env.JWT_SECRET || "chave_secreta_para_teste";

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token inválido" });
            return;
        }

        // Aqui nós pegamos o payload decodificado e o anexamos à requisição para uso posterior
        req.user = decoded as any;

        next();
    });
};
