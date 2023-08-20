

export const validarImovel = (data: ImovelData) => {
  const errors: string[] = [];

  if (data.tipoImovel !== "residencial" && data.tipoImovel !== "comercial") {
    errors.push("Tipo de imóvel inválido.");
  }

  if (!data.caracteristicas || !data.caracteristicas.tipoConstrucao) {
    errors.push("Tipo de construção é obrigatório.");
  }

  if (data.tipoCondominio === "naoIsento") {
    const condominio = data.condominio;
    if (
      !condominio ||
      !condominio.nome_condominio ||
      !condominio.nome_administradora ||
      !condominio.razao_social_condominio ||
      !condominio.cnpj_condominio ||
      !condominio.site_condominio ||
      !condominio.login_condominio ||
      !condominio.senha_condominio ||
      !condominio.telefone_fixo_condominio ||
      !condominio.telefone_celular_condominio ||
      (condominio.valor_mensal_condominio === undefined || condominio.valor_mensal_condominio === null)
    ) {
      errors.push("Campos obrigatórios para condomínio não foram preenchidos corretamente.");
    }
  }

  return errors.length > 0 ? errors : null;
};