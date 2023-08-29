import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Importa a biblioteca
import routes from "./routes/routes";

const app = express();

// Configurações de middleware

// Habilita o CORS para permitir requisições de diferentes origens
// Lembre-se de configurar as opções do CORS se você estiver usando cookies em domínios diferentes.
app.use(cors({
  origin: 'https://tsadministradora.com.br/',  
  credentials: true
}));

// Parseia o corpo das requisições JSON para objetos JavaScript
app.use(express.json());

// Utiliza o cookie-parser para parsear cookies nas requisições
app.use(cookieParser());

// Usa as rotas definidas no arquivo routes
app.use('/', routes);

export default app;
