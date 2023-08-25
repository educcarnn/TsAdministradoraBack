
export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    status?: "valid" | "invalid"; // Estou supondo que o usuário tenha um status, pois você está verificando isso no código.
}
