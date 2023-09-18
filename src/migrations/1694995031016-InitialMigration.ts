import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694995031016 implements MigrationInterface {
    name = 'InitialMigration1694995031016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresas" DROP CONSTRAINT "FK_8b5fff5a1090e57d7eb974bb5f1"`);
        await queryRunner.query(`ALTER TABLE "empresas" DROP CONSTRAINT "FK_88b257ee59be6543f49cfdbe549"`);
        await queryRunner.query(`CREATE TABLE "empresas_administradores_user" ("empresasId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_bfa1c8dd2644c86ee9996d20bcb" PRIMARY KEY ("empresasId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e0fbc8bcd0c2b522c6e091f0ef" ON "empresas_administradores_user" ("empresasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf55010fadf01f5adc16cefd85" ON "empresas_administradores_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "empresas" DROP CONSTRAINT "UQ_8b5fff5a1090e57d7eb974bb5f1"`);
        await queryRunner.query(`ALTER TABLE "empresas" DROP COLUMN "pessoaJuridicaId"`);
        await queryRunner.query(`ALTER TABLE "empresas" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "empresaId" integer`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "FK_b30ce82dbe3f191c3f91db68993" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresas_administradores_user" ADD CONSTRAINT "FK_e0fbc8bcd0c2b522c6e091f0ef2" FOREIGN KEY ("empresasId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "empresas_administradores_user" ADD CONSTRAINT "FK_cf55010fadf01f5adc16cefd856" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresas_administradores_user" DROP CONSTRAINT "FK_cf55010fadf01f5adc16cefd856"`);
        await queryRunner.query(`ALTER TABLE "empresas_administradores_user" DROP CONSTRAINT "FK_e0fbc8bcd0c2b522c6e091f0ef2"`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "FK_b30ce82dbe3f191c3f91db68993"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "empresaId"`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD "pessoaJuridicaId" integer`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD CONSTRAINT "UQ_8b5fff5a1090e57d7eb974bb5f1" UNIQUE ("pessoaJuridicaId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf55010fadf01f5adc16cefd85"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0fbc8bcd0c2b522c6e091f0ef"`);
        await queryRunner.query(`DROP TABLE "empresas_administradores_user"`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD CONSTRAINT "FK_88b257ee59be6543f49cfdbe549" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD CONSTRAINT "FK_8b5fff5a1090e57d7eb974bb5f1" FOREIGN KEY ("pessoaJuridicaId") REFERENCES "pessoa_juridica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
