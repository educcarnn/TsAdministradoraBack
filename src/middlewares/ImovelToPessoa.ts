import { NextFunction, Request, Response } from "express";
import { RegistroImovel } from "../entities/imovel";
import { Pessoa } from "../entities/pessoaFisica";
import { AppDataSource } from "../data-source"; // Certifique-se de importar o dataSource correto

export const vincularPessoaImovel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { data, pessoaId } = req.body;

    const imovelRepository = AppDataSource.getRepository(RegistroImovel);
    const pessoaRepository = AppDataSource.getRepository(Pessoa);

    const imovel = new RegistroImovel();
    const imovelSalvo = await imovelRepository.save(imovel);

    const pessoa = await pessoaRepository.findOne({ where: { id: pessoaId } });
    if (!pessoa) {
      throw new Error("Pessoa não encontrada");
    }

    imovelSalvo.proprietarios.push(pessoa);

    await imovelRepository.save(imovelSalvo);

    next();
  } catch (error) {
    console.error("Erro ao vincular pessoa e imóvel:", error);
    return res.status(500).json({ message: "Erro ao vincular pessoa e imóvel" });
  }
};
