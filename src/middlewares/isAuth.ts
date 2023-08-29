import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  // Se não houver token, responder com false
  if (!token) {
      return res.json({ isAuthenticated: false });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string };

      req.user = decoded.userId as any;  // armazene o userId no objeto req para uso posterior
      req.role = decoded.role as any;  // armazene a role no objeto req para uso posterior

      next();
  } catch (error) {
      // Se o token for inválido ou expirado, responder com false
      return res.json({ isAuthenticated: false });
  }
};

