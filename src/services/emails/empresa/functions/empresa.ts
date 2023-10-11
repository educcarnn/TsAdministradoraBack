import { Empresa } from "../../../../entities/empresa/empresa";
import { AppDataSource } from "../../../../data-source";

export const EmpresaRepository = AppDataSource.getRepository(Empresa);

export const ObterEmpresaMail = async (empresaId: number): Promise<Empresa | null> => {
    try {
      const empresa = await EmpresaRepository.findOne({ where: { id: empresaId } });
  
      return empresa || null;
    } catch (error) {
      console.error('Erro ao obter Empresa por ID:', error);
      return null;
    }
  };