import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695649116650 implements MigrationInterface {
    name = 'InitialMigration1695649116650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contrato_servico" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "registro_imovel_id" integer, CONSTRAINT "PK_fb3716bdef0b50c0af4beb45f7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "contrato_servico" ADD CONSTRAINT "FK_7b3a3dc1d73cbfe66c09cad7387" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato_servico" DROP CONSTRAINT "FK_7b3a3dc1d73cbfe66c09cad7387"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "contrato_servico"`);
    }

}
