import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1692568835268 implements MigrationInterface {
    name = 'InitialMigration1692568835268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pessoa_juridica" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" character varying NOT NULL, "cnpj" character varying NOT NULL, "razaoSocial" character varying NOT NULL, "nomeFantasia" character varying NOT NULL, "dataAberturaEmpresa" character varying NOT NULL, "novoSocioAdministrador" character varying NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, "endereco" jsonb, "dadoBancarios" jsonb, "anexos" jsonb, "lista_email" jsonb, "lista_repasse" jsonb, CONSTRAINT "PK_27c075bd2f3ee41456083626169" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registro_imovel" ("id" SERIAL NOT NULL, "tipoImovel" character varying NOT NULL, "generoImovel" character varying NOT NULL, "caracteristicas" jsonb, "negociacao" jsonb, "tipoIptu" character varying NOT NULL, "iptu" jsonb, "tipoCondominio" character varying NOT NULL, "condominio" jsonb, "localizacao" jsonb, "percentual" integer, "caracteristicasImovel" text array, "caracteristicasCondominio" text array, "fotos" text array, CONSTRAINT "PK_5d1b2ee9530dcb84ea8c47b4fbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoa" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" character varying NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "identidade" character varying NOT NULL, "orgaoExpedidor" character varying NOT NULL, "dataNascimento" character varying NOT NULL, "profissao" character varying NOT NULL, "estadoCivil" character varying NOT NULL, "filiacao" jsonb NOT NULL, "nacionalidade" character varying NOT NULL, "telefoneFixo" character varying, "telefoneCelular" character varying NOT NULL, "email" character varying NOT NULL, "genero" character varying NOT NULL, "endereco" jsonb, "dadoBancarios" jsonb, "anexos" jsonb, "lista_email" jsonb, "lista_repasse" jsonb, CONSTRAINT "PK_bb879ac36994545a5a917a09ba5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contrato" ("id" SERIAL NOT NULL, "tipoContrato" character varying NOT NULL, "garantia" jsonb, "detalhesContrato" jsonb, "proprietarioId" integer, "imovelId" integer, "pessoaId" integer, CONSTRAINT "PK_b82cfcedf2037eab18ca2714ef9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registro_imovel_contratos_contrato" ("registroImovelId" integer NOT NULL, "contratoId" integer NOT NULL, CONSTRAINT "PK_f8693ac22f141468f5365f13292" PRIMARY KEY ("registroImovelId", "contratoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_48a44314941c4fc972c83a84b9" ON "registro_imovel_contratos_contrato" ("registroImovelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_01b58ecc51aebdfc758260ad17" ON "registro_imovel_contratos_contrato" ("contratoId") `);
        await queryRunner.query(`CREATE TABLE "registro_imovel_proprietarios_pessoa" ("registroImovelId" integer NOT NULL, "pessoaId" integer NOT NULL, CONSTRAINT "PK_f137679f5c8f6949ce0dac7f4d3" PRIMARY KEY ("registroImovelId", "pessoaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_386852e65e1627468e67376c37" ON "registro_imovel_proprietarios_pessoa" ("registroImovelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e49ba129de43b4dea133b2336b" ON "registro_imovel_proprietarios_pessoa" ("pessoaId") `);
        await queryRunner.query(`CREATE TABLE "registro_imovel_proprietarios_pessoa_juridica_pessoa_juridica" ("registroImovelId" integer NOT NULL, "pessoaJuridicaId" integer NOT NULL, CONSTRAINT "PK_0c0ba52502cfbba8b6fa97d1240" PRIMARY KEY ("registroImovelId", "pessoaJuridicaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_94bb4d13812a97acf8bf259515" ON "registro_imovel_proprietarios_pessoa_juridica_pessoa_juridica" ("registroImovelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c52d66e828401f5a381c1bebec" ON "registro_imovel_proprietarios_pessoa_juridica_pessoa_juridica" ("pessoaJuridicaId") `);
        await queryRunner.query(`CREATE TABLE "contrato_proprietarios_pessoa_juridica_pessoa_juridica" ("contratoId" integer NOT NULL, "pessoaJuridicaId" integer NOT NULL, CONSTRAINT "PK_0345b24ed2353059f07f02837ce" PRIMARY KEY ("contratoId", "pessoaJuridicaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a5ddf6e3b3f730b1a94da80e54" ON "contrato_proprietarios_pessoa_juridica_pessoa_juridica" ("contratoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_390f3c625c9cd52df56aaf0427" ON "contrato_proprietarios_pessoa_juridica_pessoa_juridica" ("pessoaJuridicaId") `);
        await queryRunner.query(`CREATE TABLE "contrato_locatarios_pessoa" ("contratoId" integer NOT NULL, "pessoaId" integer NOT NULL, CONSTRAINT "PK_e3c6e2a8ddb86b29cc94915f9e6" PRIMARY KEY ("contratoId", "pessoaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c874b5479126c984314633a2b" ON "contrato_locatarios_pessoa" ("contratoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f58cbc6d39f2e1ee593cf1ad77" ON "contrato_locatarios_pessoa" ("pessoaId") `);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb" FOREIGN KEY ("imovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_effff1657a85ac8dac6026ee7a9" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_contratos_contrato" ADD CONSTRAINT "FK_48a44314941c4fc972c83a84b93" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_contratos_contrato" ADD CONSTRAINT "FK_01b58ecc51aebdfc758260ad17b" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_proprietarios_pessoa" ADD CONSTRAINT "FK_386852e65e1627468e67376c37d" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_proprietarios_pessoa" ADD CONSTRAINT "FK_e49ba129de43b4dea133b2336ba" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_proprietarios_pessoa_juridica_pessoa_juridica" ADD CONSTRAINT "FK_94bb4d13812a97acf8bf259515c" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_proprietarios_pessoa_juridica_pessoa_juridica" ADD CONSTRAINT "FK_c52d66e828401f5a381c1bebecc" FOREIGN KEY ("pessoaJuridicaId") REFERENCES "pessoa_juridica"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietarios_pessoa_juridica_pessoa_juridica" ADD CONSTRAINT "FK_a5ddf6e3b3f730b1a94da80e54c" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietarios_pessoa_juridica_pessoa_juridica" ADD CONSTRAINT "FK_390f3c625c9cd52df56aaf04276" FOREIGN KEY ("pessoaJuridicaId") REFERENCES "pessoa_juridica"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_pessoa" ADD CONSTRAINT "FK_6c874b5479126c984314633a2ba" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_pessoa" ADD CONSTRAINT "FK_f58cbc6d39f2e1ee593cf1ad777" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_pessoa" DROP CONSTRAINT "FK_f58cbc6d39f2e1ee593cf1ad777"`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_pessoa" DROP CONSTRAINT "FK_6c874b5479126c984314633a2ba"`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietarios_pessoa_juridica_pessoa_juridica" DROP CONSTRAINT "FK_390f3c625c9cd52df56aaf04276"`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietarios_pessoa_juridica_pessoa_juridica" DROP CONSTRAINT "FK_a5ddf6e3b3f730b1a94da80e54c"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_proprietarios_pessoa_juridica_pessoa_juridica" DROP CONSTRAINT "FK_c52d66e828401f5a381c1bebecc"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_proprietarios_pessoa_juridica_pessoa_juridica" DROP CONSTRAINT "FK_94bb4d13812a97acf8bf259515c"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_proprietarios_pessoa" DROP CONSTRAINT "FK_e49ba129de43b4dea133b2336ba"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_proprietarios_pessoa" DROP CONSTRAINT "FK_386852e65e1627468e67376c37d"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_contratos_contrato" DROP CONSTRAINT "FK_01b58ecc51aebdfc758260ad17b"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_contratos_contrato" DROP CONSTRAINT "FK_48a44314941c4fc972c83a84b93"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_effff1657a85ac8dac6026ee7a9"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f58cbc6d39f2e1ee593cf1ad77"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6c874b5479126c984314633a2b"`);
        await queryRunner.query(`DROP TABLE "contrato_locatarios_pessoa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_390f3c625c9cd52df56aaf0427"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a5ddf6e3b3f730b1a94da80e54"`);
        await queryRunner.query(`DROP TABLE "contrato_proprietarios_pessoa_juridica_pessoa_juridica"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c52d66e828401f5a381c1bebec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94bb4d13812a97acf8bf259515"`);
        await queryRunner.query(`DROP TABLE "registro_imovel_proprietarios_pessoa_juridica_pessoa_juridica"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e49ba129de43b4dea133b2336b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_386852e65e1627468e67376c37"`);
        await queryRunner.query(`DROP TABLE "registro_imovel_proprietarios_pessoa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01b58ecc51aebdfc758260ad17"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48a44314941c4fc972c83a84b9"`);
        await queryRunner.query(`DROP TABLE "registro_imovel_contratos_contrato"`);
        await queryRunner.query(`DROP TABLE "contrato"`);
        await queryRunner.query(`DROP TABLE "pessoa"`);
        await queryRunner.query(`DROP TABLE "registro_imovel"`);
        await queryRunner.query(`DROP TABLE "pessoa_juridica"`);
    }

}
