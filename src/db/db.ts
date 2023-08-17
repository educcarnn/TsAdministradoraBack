import { PoolConfig } from "pg";

export const dbConfig: PoolConfig = {
  connectionString: "postgres://tsadministradoback:M76iYdAFvTmHIKVF0FgFz9YD64QYS2bs@dpg-cjd6o0s5kgrc73avnndg-a.oregon-postgres.render.com/tsadministradoback",
  ssl: {
    rejectUnauthorized: false // Configuração para permitir conexões SSL não verificadas
  }
};


export const emailConfig = {
  service: 'your_email_service', // Ex: Gmail
  auth: {
    user: 'your_email',
    pass: 'your_email_password',
  },
};

export const jwtSecret = 'your_jwt_secret';