import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694193832391 implements MigrationInterface {
    name = 'InitialMigration1694193832391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pessoa_imoveis_proprietarios_registro_imovel" ("pessoaId" integer NOT NULL, "registroImovelId" integer NOT NULL, CONSTRAINT "PK_315df6a7c19d30769a36a8bd79b" PRIMARY KEY ("pessoaId", "registroImovelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8adb8e61349b1077c212b1207b" ON "pessoa_imoveis_proprietarios_registro_imovel" ("pessoaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b50b7673c13628b0030ba16b39" ON "pessoa_imoveis_proprietarios_registro_imovel" ("registroImovelId") `);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "pessoa_imoveis_proprietarios_registro_imovel" ADD CONSTRAINT "FK_8adb8e61349b1077c212b1207bd" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pessoa_imoveis_proprietarios_registro_imovel" ADD CONSTRAINT "FK_b50b7673c13628b0030ba16b39f" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa_imoveis_proprietarios_registro_imovel" DROP CONSTRAINT "FK_b50b7673c13628b0030ba16b39f"`);
        await queryRunner.query(`ALTER TABLE "pessoa_imoveis_proprietarios_registro_imovel" DROP CONSTRAINT "FK_8adb8e61349b1077c212b1207bd"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b50b7673c13628b0030ba16b39"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8adb8e61349b1077c212b1207b"`);
        await queryRunner.query(`DROP TABLE "pessoa_imoveis_proprietarios_registro_imovel"`);
    }

}
