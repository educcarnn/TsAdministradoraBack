import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Importa a biblioteca
import routes from "./routes/routes";

const app = express();

// Configurações de middleware

// Habilita o CORS para permitir requisições de diferentes origens
// Lembre-se de configurar as opções do CORS se você estiver usando cookies em domínios diferentes.
//const allowedOrigins = ['https://localhost:3001', 'https://tsadministradora.com.br'];

app.use(cors({
  origin: '*', // Defina a origem permitida aqui
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permite enviar cookies de autenticação
  optionsSuccessStatus: 204, // Resposta de sucesso para opções pré-voo
}));
// Parseia o corpo das requisições JSON para objetos JavaScript
app.use(express.json());


app.use(cookieParser());

// Usa as rotas definidas no arquivo routes
app.use('/', routes);

export default app;
