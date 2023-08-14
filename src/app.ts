import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import registerClientes from "./routes/registerClientes";

const app = express();


app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/', registerClientes); 



export default app;