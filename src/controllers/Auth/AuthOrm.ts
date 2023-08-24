import { Request, Response } from "express";
import * as UserService from "../../services/user"; // Ajuste o caminho conforme necessário

export const registerUser = async (req: Request, res: Response) => {
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Erro no registro' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.findUserByEmail(req.body.email);
        
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        
        const isValidPassword = await UserService.checkPassword(req.body.password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ message: "Senha incorreta." });
        }

        // Aqui você pode gerar e enviar um token JWT ou qualquer lógica de sessão que estiver usando.
        res.status(200).json({ message: "Login bem-sucedido!", role: user.role });
        
    } catch (error) {
        res.status(500).json({ message: 'Erro no login' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10); // Convertendo para número
        if (isNaN(userId)) {
            return res.status(400).json({ message: "ID do usuário inválido." });
        }
        await UserService.updateUserById(userId, req.body);
        res.status(200).json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar usuário"});
    }
};


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }
        await UserService.deleteUserById(id);
        res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
        res.status(400).json({ message: "Erro ao deletar usuário"});
    }
};
