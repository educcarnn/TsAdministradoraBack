import { ImovelData } from "../models/imovel";

export const validarImovel = (data: ImovelData) => {
  const errors: string[] = [];

  if (data.tipoImovel !== "residencial" && data.tipoImovel !== "comercial") {
    errors.push("Tipo de imóvel inválido.");
  }

  if (!data.caracteristicas || !data.caracteristicas.tipoConstrucao) {
    errors.push("Tipo de construção é obrigatório.");
  }

  if (data.tipoCondominio === "naoIsento") {
    if (
      !data.condominio ||
      !data.condominio.nomeCondominio ||
      !data.condominio.nomeAdministradora ||
      !data.condominio.razaoSocial ||
      !data.condominio.cnpj ||
      !data.condominio.site ||
      !data.condominio.login ||
      !data.condominio.senha ||
      !data.condominio.telefoneFixo ||
      !data.condominio.telefoneCelular ||
      isNaN(data.condominio.valorMensal) ||
      data.condominio.valorMensal <= 0
    ) {
      errors.push("Campos obrigatórios para condomínio não foram preenchidos corretamente.");
    }
  }

  // Adicione mais validações conforme necessário

  return errors.length > 0 ? errors : null;
};
