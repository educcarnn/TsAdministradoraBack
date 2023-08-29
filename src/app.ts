import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Importa a biblioteca
import routes from "./routes/routes";

const app = express();

// Configurações de middleware

// Habilita o CORS para permitir requisições de diferentes origens
// Lembre-se de configurar as opções do CORS se você estiver usando cookies em domínios diferentes.
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000', 'http://tsadministradora.com.br', 'http://tsadministradora.onrender.com', 'http://192.168.15.147:3001'];

app.use(cors({
  origin: function(origin, callback){
    // Se a origem da requisição estiver na lista de allowedOrigins, permita a requisição
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'A política de CORS para este site não permite o acesso a partir da origem especificada.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// Parseia o corpo das requisições JSON para objetos JavaScript
app.use(express.json());


app.use(cookieParser());

// Usa as rotas definidas no arquivo routes
app.use('/', routes);

export default app;
