import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695213158124 implements MigrationInterface {
    name = 'InitialMigration1695213158124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "anexo" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "pessoa_id" integer, "imovel_id" integer, CONSTRAINT "PK_27e4d8c497d4d150ea248533135" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoa_intermediaria" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" text array NOT NULL DEFAULT ARRAY[]::text[], "telefoneFixo" character varying, "telefoneCelular" character varying NOT NULL, "email" character varying, "password" character varying, "endereco" jsonb, "dadoBancarios" jsonb, "lista_email" jsonb, "lista_repasse" jsonb, CONSTRAINT "PK_79d8ca215e300528e6d0e822af0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "empresaId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "empresas" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "endereco" character varying NOT NULL, "telefone" character varying NOT NULL, CONSTRAINT "PK_ce7b122b37c6499bfd6520873e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoa_juridica" ("id" SERIAL NOT NULL, "cnpj" character varying NOT NULL, "razaoSocial" character varying NOT NULL, "nomeFantasia" character varying NOT NULL, "dataAberturaEmpresa" character varying NOT NULL, "novoSocioAdministrador" character varying NOT NULL, "password" character varying, "dadosComunsId" integer NOT NULL, "empresaId" integer, CONSTRAINT "REL_44ce62041cc9d18549d0932737" UNIQUE ("dadosComunsId"), CONSTRAINT "PK_27c075bd2f3ee41456083626169" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proprietario_imovel" ("id" SERIAL NOT NULL, "percentualPropriedade" double precision NOT NULL, "pessoaId" integer, "pessoaJuridicaId" integer, "registroImovelId" integer, CONSTRAINT "PK_cec31e53f80ffccd08350c78ac3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contrato_proprietario" ("id" SERIAL NOT NULL, "percentual" integer NOT NULL, "contratoId" integer, "proprietarioId" integer, CONSTRAINT "PK_a349a03236ea2b18522a146a481" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fiador" ("id" SERIAL NOT NULL, "numeroMatriculaRGI" character varying NOT NULL, "pessoaId" integer, "imovelComoFiancaId" integer, CONSTRAINT "PK_947951927916695dbd817ba473f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoa" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "identidade" character varying NOT NULL, "orgaoExpedidor" character varying NOT NULL, "dataNascimento" character varying NOT NULL, "profissao" character varying NOT NULL, "estadoCivil" character varying NOT NULL, "filiacao" jsonb NOT NULL, "nacionalidade" character varying NOT NULL, "password" character varying, "role" "public"."pessoa_role_enum" DEFAULT 'user', "genero" character varying NOT NULL, "dadosComunsId" integer NOT NULL, "empresaId" integer, CONSTRAINT "REL_b8d5405d72ef06b41b331685b9" UNIQUE ("dadosComunsId"), CONSTRAINT "PK_bb879ac36994545a5a917a09ba5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contrato_inquilino" ("id" SERIAL NOT NULL, "percentual" integer NOT NULL, "contratoId" integer, "inquilinoId" integer, CONSTRAINT "PK_a37f1d6ae447141a03bc68374cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contrato" ("id" SERIAL NOT NULL, "tipoContrato" character varying NOT NULL, "garantia" jsonb, "detalhesContrato" jsonb, "imovelId" integer, CONSTRAINT "PK_b82cfcedf2037eab18ca2714ef9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registro_imovel" ("id" SERIAL NOT NULL, "tipoImovel" character varying NOT NULL, "generoImovel" character varying NOT NULL, "caracteristicas" jsonb, "negociacao" jsonb, "tipoIptu" character varying NOT NULL, "iptu" jsonb, "tipoCondominio" character varying NOT NULL, "condominio" jsonb, "localizacao" jsonb, "percentual" integer, "caracteristicas_imovel" text array, "caracteristicas_condominio" text array, "anuncio" jsonb, CONSTRAINT "PK_5d1b2ee9530dcb84ea8c47b4fbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "anexo" ADD CONSTRAINT "FK_fd32619e33b50206d538cb47b9d" FOREIGN KEY ("pessoa_id") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anexo" ADD CONSTRAINT "FK_976e9f759caa6e80133fcef9123" FOREIGN KEY ("imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c61de3f105d4df98f8f62c95d77" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "FK_b30ce82dbe3f191c3f91db68993" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "FK_44ce62041cc9d18549d09327379" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_40840f70cfd3d48b74252c7d593" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_c239c160554597688f846d7bff1" FOREIGN KEY ("pessoaJuridicaId") REFERENCES "pessoa_juridica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" ADD CONSTRAINT "FK_c34c39f02193cc823f5138f650b" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" ADD CONSTRAINT "FK_2dfda39386edff45bf19882b59e" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiador" ADD CONSTRAINT "FK_52e30e8b845fab07bfec11dcf87" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiador" ADD CONSTRAINT "FK_b74a7a777ff487729e1bf1741e5" FOREIGN KEY ("imovelComoFiancaId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_5606cc3c5005d518c1a7ec09b28" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb" FOREIGN KEY ("imovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb"`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005"`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f"`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_5606cc3c5005d518c1a7ec09b28"`);
        await queryRunner.query(`ALTER TABLE "fiador" DROP CONSTRAINT "FK_b74a7a777ff487729e1bf1741e5"`);
        await queryRunner.query(`ALTER TABLE "fiador" DROP CONSTRAINT "FK_52e30e8b845fab07bfec11dcf87"`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" DROP CONSTRAINT "FK_2dfda39386edff45bf19882b59e"`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" DROP CONSTRAINT "FK_c34c39f02193cc823f5138f650b"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_c239c160554597688f846d7bff1"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_40840f70cfd3d48b74252c7d593"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "FK_44ce62041cc9d18549d09327379"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "FK_b30ce82dbe3f191c3f91db68993"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c61de3f105d4df98f8f62c95d77"`);
        await queryRunner.query(`ALTER TABLE "anexo" DROP CONSTRAINT "FK_976e9f759caa6e80133fcef9123"`);
        await queryRunner.query(`ALTER TABLE "anexo" DROP CONSTRAINT "FK_fd32619e33b50206d538cb47b9d"`);
        await queryRunner.query(`DROP TABLE "registro_imovel"`);
        await queryRunner.query(`DROP TABLE "contrato"`);
        await queryRunner.query(`DROP TABLE "contrato_inquilino"`);
        await queryRunner.query(`DROP TABLE "pessoa"`);
        await queryRunner.query(`DROP TABLE "fiador"`);
        await queryRunner.query(`DROP TABLE "contrato_proprietario"`);
        await queryRunner.query(`DROP TABLE "proprietario_imovel"`);
        await queryRunner.query(`DROP TABLE "pessoa_juridica"`);
        await queryRunner.query(`DROP TABLE "empresas"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "pessoa_intermediaria"`);
        await queryRunner.query(`DROP TABLE "anexo"`);
    }

}
