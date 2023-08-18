import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Contract } from "../entities/contrato";
import { Person } from "../models/Person";
import { Property } from "../models/Property";

export const cadastrarContrato = async (req: Request, res: Response) => {
  const data: Contract = req.body;
  try {
    const contractRepository = getRepository(Contract);
    const personRepository = getRepository(Person);
    const propertyRepository = getRepository(Property);

    const pessoa = await personRepository.findOne(data.pessoa.id);
    const imovel = await propertyRepository.findOne(data.imovel.id);
    const proprietario = await personRepository.findOne(data.proprietario.id);

    const contract = new Contract();
    contract.pessoa = pessoa;
    contract.imovel = imovel;
    contract.proprietario = proprietario;
    contract.tipoContrato = data.tipoContrato;
    contract.locatarios = data.locatarios;
    contract.garantia = data.garantia;
    contract.dataInicio = data.dataInicio;
    contract.dataTermino = data.dataTermino;
    contract.valor = data.valor;
    contract.seguradora = data.seguradora;
    contract.apolice = data.apolice;
    contract.numeroParcelas = data.numeroParcelas;
    contract.observacao = data.observacao;

    await contractRepository.save(contract);

    res.status(201).json({ message: "Contrato cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar contrato:", error);
    res.status(500).json({ message: "Erro ao cadastrar contrato" });
  }
};
