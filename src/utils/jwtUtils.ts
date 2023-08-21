// src/utils/jwtUtils.ts

import jwt from 'jsonwebtoken';

export const generateToken = (user: { id: number; admin: boolean }): string =>
  jwt.sign({ user }, 'seuSegredoDoJWT', { expiresIn: '1h' });
