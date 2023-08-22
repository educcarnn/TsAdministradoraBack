import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1692675536795 implements MigrationInterface {
    name = 'InitialMigration1692675536795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc"`);
        await queryRunner.query(`CREATE TABLE "contrato_imoveis_registro_imovel" ("contratoId" integer NOT NULL, "registroImovelId" integer NOT NULL, CONSTRAINT "PK_ac18b916146789079aab199f2fa" PRIMARY KEY ("contratoId", "registroImovelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fe913015f435d6efdd9312ee7" ON "contrato_imoveis_registro_imovel" ("contratoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_01ff6587e6f88ce860756ec1c5" ON "contrato_imoveis_registro_imovel" ("registroImovelId") `);
        await queryRunner.query(`CREATE TABLE "registro_imovel_contratos_contrato" ("registroImovelId" integer NOT NULL, "contratoId" integer NOT NULL, CONSTRAINT "PK_f8693ac22f141468f5365f13292" PRIMARY KEY ("registroImovelId", "contratoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_48a44314941c4fc972c83a84b9" ON "registro_imovel_contratos_contrato" ("registroImovelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_01b58ecc51aebdfc758260ad17" ON "registro_imovel_contratos_contrato" ("contratoId") `);
        await queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "imovelId"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "proprietarioId"`);
        await queryRunner.query(`ALTER TABLE "contrato_imoveis_registro_imovel" ADD CONSTRAINT "FK_6fe913015f435d6efdd9312ee71" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contrato_imoveis_registro_imovel" ADD CONSTRAINT "FK_01ff6587e6f88ce860756ec1c5a" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_contratos_contrato" ADD CONSTRAINT "FK_48a44314941c4fc972c83a84b93" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_contratos_contrato" ADD CONSTRAINT "FK_01b58ecc51aebdfc758260ad17b" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registro_imovel_contratos_contrato" DROP CONSTRAINT "FK_01b58ecc51aebdfc758260ad17b"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel_contratos_contrato" DROP CONSTRAINT "FK_48a44314941c4fc972c83a84b93"`);
        await queryRunner.query(`ALTER TABLE "contrato_imoveis_registro_imovel" DROP CONSTRAINT "FK_01ff6587e6f88ce860756ec1c5a"`);
        await queryRunner.query(`ALTER TABLE "contrato_imoveis_registro_imovel" DROP CONSTRAINT "FK_6fe913015f435d6efdd9312ee71"`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD "proprietarioId" integer`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD "imovelId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01b58ecc51aebdfc758260ad17"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48a44314941c4fc972c83a84b9"`);
        await queryRunner.query(`DROP TABLE "registro_imovel_contratos_contrato"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01ff6587e6f88ce860756ec1c5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6fe913015f435d6efdd9312ee7"`);
        await queryRunner.query(`DROP TABLE "contrato_imoveis_registro_imovel"`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb" FOREIGN KEY ("imovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
