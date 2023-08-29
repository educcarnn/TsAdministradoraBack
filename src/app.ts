import express from 'express';
import cors from 'cors';
import routes from "./routes/routes";

const app = express();

// Lista dos domínios que você quer permitir
const allowedOrigins = [
    'https://localhost:3000',
    'https://localhost:3001',
    'https://tsadministradora.com.br',
    'http://tsadministradora.com.br',
    'https://tsadministradora.onrender.com',
    'http://tsadministradora.onrender.com'

];

app.use((req, res, next) => {
    const origin = req.get('origin');


    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Configura outros cabeçalhos CORS
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    
    next();
});

// Parseia o corpo das requisições JSON para objetos JavaScript
app.use(express.json());

// Usa as rotas definidas no arquivo routes
app.use('/', routes);

export default app;
