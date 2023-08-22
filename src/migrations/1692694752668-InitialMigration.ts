import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1692694752668 implements MigrationInterface {
    name = 'InitialMigration1692694752668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registro_imovel" ("id" SERIAL NOT NULL, "tipoImovel" character varying NOT NULL, "generoImovel" character varying NOT NULL, "caracteristicas" jsonb, "negociacao" jsonb, "tipoIptu" character varying NOT NULL, "iptu" jsonb, "tipoCondominio" character varying NOT NULL, "condominio" jsonb, "localizacao" jsonb, "percentual" integer, "caracteristicasImovel" text array, "caracteristicasCondominio" text array, "fotos" text array, CONSTRAINT "PK_5d1b2ee9530dcb84ea8c47b4fbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoa" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" character varying NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "identidade" character varying NOT NULL, "orgaoExpedidor" character varying NOT NULL, "dataNascimento" character varying NOT NULL, "profissao" character varying NOT NULL, "estadoCivil" character varying NOT NULL, "filiacao" jsonb NOT NULL, "nacionalidade" character varying NOT NULL, "telefoneFixo" character varying, "telefoneCelular" character varying NOT NULL, "email" character varying, "genero" character varying NOT NULL, "endereco" jsonb, "dadoBancarios" jsonb, "anexos" jsonb, "lista_email" jsonb NOT NULL, "lista_repasse" jsonb NOT NULL, CONSTRAINT "PK_bb879ac36994545a5a917a09ba5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contrato" ("id" SERIAL NOT NULL, "tipoContrato" character varying NOT NULL, "garantia" jsonb, "detalhesContrato" jsonb, CONSTRAINT "PK_b82cfcedf2037eab18ca2714ef9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoa_juridica" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" character varying NOT NULL, "cnpj" character varying NOT NULL, "razaoSocial" character varying NOT NULL, "nomeFantasia" character varying NOT NULL, "dataAberturaEmpresa" character varying NOT NULL, "novoSocioAdministrador" character varying NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, "endereco" jsonb, "dadoBancarios" jsonb, "anexos" jsonb, "lista_email" jsonb, "lista_repasse" jsonb, CONSTRAINT "PK_27c075bd2f3ee41456083626169" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "admin" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registro_imovel_pessoas_pessoa" ("registroImovelId" integer NOT NULL, "pessoaId" integer NOT NULL, CONSTRAINT "PK_0732b6b4e500eda4ad5f43a6c8f" PRIMARY KEY ("registroImovelId", "pessoaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_57e8a54cb5866168135fdd5069" ON "registro_imovel_pessoas_pessoa" ("registroImovelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_63bf8c626813ed319fc0cfa518" ON "registro_imovel_pessoas_pessoa" ("pessoaId") `);
        await queryRunner.query(`CREATE TABLE "contrato_locatarios_pessoa" ("contratoId" integer NOT NULL, "pessoaId" integer NOT NULL, CONSTRAINT "PK_e3c6e2a8ddb86b29cc94915f9e6" PRIMARY KEY ("contratoId", "pessoaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c874b5479126c984314633a2b" ON "contrato_locatarios_pessoa" ("contratoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f58cbc6d39f2e1ee593cf1ad77" ON "contrato_locatarios_pessoa" ("pessoaId") `);
        await queryRunner.query(`CREATE TABLE "contrato_imoveis_registro_imovel" ("contratoId" integer NOT NULL, "registroImovelId" integer NOT NULL, CONSTRAINT "PK_ac18b916146789079aab199f2fa" PRIMARY KEY ("contratoId", "registroImovelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fe913015f435d6efdd9312ee7" ON "contrato_imoveis_registro_imovel" ("contratoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_01ff6587e6f88ce860756ec1c5" ON "contrato_imoveis_registro_imovel" ("registroImovelId") `);
        await queryRunner.query(`ALTER TABLE "registro_imovel_pessoas_pessoa" ADD CONSTRAINT "FK_57e8a54cb5866168135fdd50694" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_pessoas_pessoa" ADD CONSTRAINT "FK_63bf8c626813ed319fc0cfa5181" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_pessoa" ADD CONSTRAINT "FK_6c874b5479126c984314633a2ba" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_pessoa" ADD CONSTRAINT "FK_f58cbc6d39f2e1ee593cf1ad777" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_imoveis_registro_imovel" ADD CONSTRAINT "FK_6fe913015f435d6efdd9312ee71" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contrato_imoveis_registro_imovel" ADD CONSTRAINT "FK_01ff6587e6f88ce860756ec1c5a" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato_imoveis_registro_imovel" DROP CONSTRAINT "FK_01ff6587e6f88ce860756ec1c5a"`);
        await queryRunner.query(`ALTER TABLE "contrato_imoveis_registro_imovel" DROP CONSTRAINT "FK_6fe913015f435d6efdd9312ee71"`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_pessoa" DROP CONSTRAINT "FK_f58cbc6d39f2e1ee593cf1ad777"`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_pessoa" DROP CONSTRAINT "FK_6c874b5479126c984314633a2ba"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_pessoas_pessoa" DROP CONSTRAINT "FK_63bf8c626813ed319fc0cfa5181"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_pessoas_pessoa" DROP CONSTRAINT "FK_57e8a54cb5866168135fdd50694"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01ff6587e6f88ce860756ec1c5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6fe913015f435d6efdd9312ee7"`);
        await queryRunner.query(`DROP TABLE "contrato_imoveis_registro_imovel"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f58cbc6d39f2e1ee593cf1ad77"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6c874b5479126c984314633a2b"`);
        await queryRunner.query(`DROP TABLE "contrato_locatarios_pessoa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63bf8c626813ed319fc0cfa518"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_57e8a54cb5866168135fdd5069"`);
        await queryRunner.query(`DROP TABLE "registro_imovel_pessoas_pessoa"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "pessoa_juridica"`);
        await queryRunner.query(`DROP TABLE "contrato"`);
        await queryRunner.query(`DROP TABLE "pessoa"`);
        await queryRunner.query(`DROP TABLE "registro_imovel"`);
    }

}
