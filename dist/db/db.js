"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = exports.emailConfig = exports.dbConfig = void 0;
exports.dbConfig = {
    connectionString: "postgres://tsadministradoback:M76iYdAFvTmHIKVF0FgFz9YD64QYS2bs@dpg-cjd6o0s5kgrc73avnndg-a.oregon-postgres.render.com/tsadministradoback",
    ssl: {
        rejectUnauthorized: false
    }
};
exports.emailConfig = {
    service: 'your_email_service',
    auth: {
        user: 'your_email',
        pass: 'your_email_password',
    },
};
exports.jwtSecret = 'your_jwt_secret';
