import express from 'express';
import routes from "./routes/routes";

const app = express();

// Lista dos domínios que você quer permitir
const origensPermitidas = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://tsadministradora.onrender.com',
    'https://tsadministradora.onrender.com',
    'https://tsadministradora.com.br',
    'http://tsadministradora.com.br',
    'n-git-main-educcarnn.vercel.app',
    'n-ba8lchbcb-educcarnn.vercel.app'
];

app.use((req, res, next) => {
    const origem = req.get('origin');

    if (origensPermitidas.includes(origem as string)) {
        res.setHeader('Access-Control-Allow-Origin', origem as string);
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