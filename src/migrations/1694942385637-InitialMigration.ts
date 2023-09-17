import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694942385637 implements MigrationInterface {
    name = 'InitialMigration1694942385637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54"`);
        await queryRunner.query(`CREATE TABLE "contrato_inquilino" ("id" SERIAL NOT NULL, "percentual" integer NOT NULL, "contratoId" integer, "inquilinoId" integer, CONSTRAINT "PK_a37f1d6ae447141a03bc68374cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contrato_proprietario" ("id" SERIAL NOT NULL, "percentual" integer NOT NULL, "contratoId" integer, "proprietarioId" integer, CONSTRAINT "PK_a349a03236ea2b18522a146a481" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoa_intermediaria" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" text array NOT NULL DEFAULT ARRAY[]::text[], "telefoneFixo" character varying, "telefoneCelular" character varying NOT NULL, "email" character varying, "password" character varying, "endereco" jsonb, "dadoBancarios" jsonb, "anexos" jsonb, "lista_email" jsonb, "lista_repasse" jsonb, CONSTRAINT "PK_79d8ca215e300528e6d0e822af0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pessoa_fisica_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "pessoa_fisica" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "identidade" character varying NOT NULL, "orgaoExpedidor" character varying NOT NULL, "dataNascimento" character varying NOT NULL, "profissao" character varying NOT NULL, "estadoCivil" character varying NOT NULL, "filiacao" jsonb NOT NULL, "nacionalidade" character varying NOT NULL, "password" character varying, "role" "public"."pessoa_fisica_role_enum" DEFAULT 'user', "genero" character varying NOT NULL, "dadosComunsId" integer NOT NULL, CONSTRAINT "REL_a7542a9d9c98214fde65e9f4b2" UNIQUE ("dadosComunsId"), CONSTRAINT "PK_72e64d3132e629005d6073da51c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proprietario_imovel" ("id" SERIAL NOT NULL, "percentualPropriedade" double precision NOT NULL, "pessoaId" integer, "registroImovelId" integer, CONSTRAINT "PK_cec31e53f80ffccd08350c78ac3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fiador" ("id" SERIAL NOT NULL, "numeroMatriculaRGI" character varying NOT NULL, "imovelComoFiancaId" integer, CONSTRAINT "PK_947951927916695dbd817ba473f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "proprietarioId"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "fotos"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "proprietarioId"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "inquilinoId"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "lista_repasse"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "lista_email"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "anexos"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "dadoBancarios"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "endereco"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "telefone"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "funcao"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "tipo"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "ads" jsonb`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "docs" text array`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "dadosComunsId" integer`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "UQ_44ce62041cc9d18549d09327379" UNIQUE ("dadosComunsId")`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa_fisica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" ADD CONSTRAINT "FK_c34c39f02193cc823f5138f650b" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" ADD CONSTRAINT "FK_2dfda39386edff45bf19882b59e" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa_fisica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "FK_a7542a9d9c98214fde65e9f4b2f" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_40840f70cfd3d48b74252c7d593" FOREIGN KEY ("pessoaId") REFERENCES "pessoa_fisica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "FK_44ce62041cc9d18549d09327379" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiador" ADD CONSTRAINT "FK_b74a7a777ff487729e1bf1741e5" FOREIGN KEY ("imovelComoFiancaId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fiador" DROP CONSTRAINT "FK_b74a7a777ff487729e1bf1741e5"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "FK_44ce62041cc9d18549d09327379"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_40840f70cfd3d48b74252c7d593"`);
        await queryRunner.query(`ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "FK_a7542a9d9c98214fde65e9f4b2f"`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" DROP CONSTRAINT "FK_2dfda39386edff45bf19882b59e"`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" DROP CONSTRAINT "FK_c34c39f02193cc823f5138f650b"`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005"`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "UQ_44ce62041cc9d18549d09327379"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "dadosComunsId"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "docs"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "ads"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "tipo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "funcao" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "telefone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "endereco" jsonb`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "dadoBancarios" jsonb`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "anexos" jsonb`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "lista_email" jsonb`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "lista_repasse" jsonb`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD "inquilinoId" integer`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD "proprietarioId" integer`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "fotos" text array`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "proprietarioId" integer`);
        await queryRunner.query(`DROP TABLE "fiador"`);
        await queryRunner.query(`DROP TABLE "proprietario_imovel"`);
        await queryRunner.query(`DROP TABLE "pessoa_fisica"`);
        await queryRunner.query(`DROP TYPE "public"."pessoa_fisica_role_enum"`);
        await queryRunner.query(`DROP TABLE "pessoa_intermediaria"`);
        await queryRunner.query(`DROP TABLE "contrato_proprietario"`);
        await queryRunner.query(`DROP TABLE "contrato_inquilino"`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
