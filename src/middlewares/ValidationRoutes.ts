

/**
 * Middleware para garantir que um usuário tenha a role adequada para acessar uma rota
 */
/*
export function ensureRole(roleRequired: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as User; // Suponha que o usuário está anexado ao objeto req após a autenticação

        if (!user) {
            return res.status(401).send("Não autenticado.");
        }

        if (user.role !== roleRequired) {
            return res.status(403).send("Acesso negado.");
        }

        next();
    }
}
*/