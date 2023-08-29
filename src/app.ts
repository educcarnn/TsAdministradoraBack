import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Importa a biblioteca
import routes from "./routes/routes";

const app = express();

// Configurações de middleware

// Habilita o CORS para permitir requisições de diferentes origens
// Lembre-se de configurar as opções do CORS se você estiver usando cookies em domínios diferentes.
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://tsadministradora.com.br",
  "http://tsadministradora.com.br",
  "http://tsadministradora.dev",
  "https://tsadministradora.dev",
  "https://tsadministradora.onrender.com",
  "http://tsadministradora.onrender.com",
  "https://n-ba8lchbcb-educcarnn.vercel.app/",
  "http://n-ba8lchbcb-educcarnn.vercel.app/",
  "https://n-git-main-educcarnn.vercel.app/",
  "http://n-git-main-educcarnn.vercel.app/",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.header("Access-Control-Allow-credentials", true as unknown as undefined);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(express.json());

app.use(cookieParser());

app.use("/", routes);

export default app;
