// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedUser {
  user: {
    id: number;
    admin: boolean;
  };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401).json({ msg: 'Token de autorização não fornecido' });
  } else {
    try {
      const decoded = jwt.verify(token, 'seuSegredoDoJWT') as DecodedUser;
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token inválido' });
    }
  }
};
