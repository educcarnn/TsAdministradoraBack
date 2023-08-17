/*
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db';
import { jwtSecret, emailConfig } from '../../db/db'
import nodemailer from 'nodemailer';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const router = express.Router();

// Função para enviar convite por e-mail
const sendInviteEmail = (email: string, token: string) => {
  const transporter = nodemailer.createTransport(emailConfig);
  const mailOptions = {
    from: 'your_email',
    to: email,
    subject: 'Invitation to join our platform',
    text: `You have been invited to join our platform. Click on the link to register: http://localhost:3000/register/${token}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending invite email:', error);
    } else {
      console.log('Invite email sent:', info.response);
    }
  });
};

// Registro de usuário e envio de convite por e-mail
router.post('/register', async (req: Request, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, jwtSecret);

  try {
    const client = await pool.connect();
    await client.query('BEGIN');
    const insertUserQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
    await client.query(insertUserQuery, [email, hashedPassword]);
    await client.query('COMMIT');
    client.release();

    sendInviteEmail(email, token);

    res.status(201).json({ message: 'User registered successfully. Invitation sent to email.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login de usuário e geração de token JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    client.release();

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, jwtSecret);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Middleware para verificar o token e permitir o acesso
function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Acesso negado' });
    }
  
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token invalido' });
      }
      req.user = user; // Certifique-se de que `req.user` tenha o tipo correto também
      next();
    });
  }

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the protected area!' });
});

export default router;
*/