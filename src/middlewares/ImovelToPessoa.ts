import { NextFunction, Request, Response } from "express";
import { RegistroImovel } from "../entities/imovel";
import { Pessoa } from "../entities/pessoaFisica";
import { Contrato } from "../entities/contrato";
import { AppDataSource } from "../data-source";

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

    const contratoRepository = AppDataSource.getRepository(Contrato);
    const contrato = new Contrato();
    contrato.imovel = imovelSalvo;
    await contratoRepository.save(contrato);

    await imovelRepository.save(imovelSalvo);

    next(); // Chama o próximo middleware ou rota sem retornar nenhum valor
  } catch (error) {
    console.error("Erro ao vincular pessoa e imóvel:", error);
    res.status(500).json({ message: "Erro ao vincular pessoa e imóvel" }); // Retornar a resposta diretamente aqui
  }
};
