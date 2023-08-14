
import { Request, Response, NextFunction } from 'express';

const emailsCadastrados = ['educcarnn@gmail.com', 'tiagorsardinha@gmail.com'];

export function checkEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  if (emailsCadastrados.includes(email)) {
    // Se o e-mail estiver cadastrado, chame a próxima função no pipeline de middleware
    next();
  } else {
    // Se o e-mail não estiver cadastrado, retorne uma resposta de erro
    res.status(401).json({ error: 'Acesso não autorizado. E-mail não cadastrado.' });
  }
}
