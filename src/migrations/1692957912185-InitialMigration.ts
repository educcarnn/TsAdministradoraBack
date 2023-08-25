import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1692957912185 implements MigrationInterface {
    name = 'InitialMigration1692957912185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registro_imovel" ("id" SERIAL NOT NULL, "tipoImovel" character varying NOT NULL, "generoImovel" character varying NOT NULL, "caracteristicas" jsonb, "negociacao" jsonb, "tipoIptu" character varying NOT NULL, "iptu" jsonb, "tipoCondominio" character varying NOT NULL, "condominio" jsonb, "localizacao" jsonb, "percentual" integer, "caracteristicas_imovel" text array, "caracteristicas_condominio" text array, "fotos" text array, "proprietarioId" integer, CONSTRAINT "PK_5d1b2ee9530dcb84ea8c47b4fbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoa" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" character varying NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "identidade" character varying NOT NULL, "orgaoExpedidor" character varying NOT NULL, "dataNascimento" character varying NOT NULL, "profissao" character varying NOT NULL, "estadoCivil" character varying NOT NULL, "filiacao" jsonb NOT NULL, "nacionalidade" character varying NOT NULL, "telefoneFixo" character varying, "telefoneCelular" character varying NOT NULL, "email" character varying, "genero" character varying NOT NULL, "endereco" jsonb, "dadoBancarios" jsonb, "anexos" jsonb, "lista_email" jsonb, "lista_repasse" jsonb, CONSTRAINT "PK_bb879ac36994545a5a917a09ba5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contrato" ("id" SERIAL NOT NULL, "tipoContrato" character varying NOT NULL, "garantia" jsonb, "detalhesContrato" jsonb, "inquilinoId" integer, "proprietarioId" integer, "imovelId" integer, CONSTRAINT "PK_b82cfcedf2037eab18ca2714ef9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoa_juridica" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" character varying NOT NULL, "cnpj" character varying NOT NULL, "razaoSocial" character varying NOT NULL, "nomeFantasia" character varying NOT NULL, "dataAberturaEmpresa" character varying NOT NULL, "novoSocioAdministrador" character varying NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, "endereco" jsonb, "dadoBancarios" jsonb, "anexos" jsonb, "lista_email" jsonb, "lista_repasse" jsonb, CONSTRAINT "PK_27c075bd2f3ee41456083626169" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb" FOREIGN KEY ("imovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "pessoa_juridica"`);
        await queryRunner.query(`DROP TABLE "contrato"`);
        await queryRunner.query(`DROP TABLE "pessoa"`);
        await queryRunner.query(`DROP TABLE "registro_imovel"`);
    }

}
