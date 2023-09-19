import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695118149833 implements MigrationInterface {
    name = 'InitialMigration1695118149833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "anexo" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "pessoa_id" integer, CONSTRAINT "PK_27e4d8c497d4d150ea248533135" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" DROP COLUMN "anexos"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anexo" ADD CONSTRAINT "FK_fd32619e33b50206d538cb47b9d" FOREIGN KEY ("pessoa_id") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "anexo" DROP CONSTRAINT "FK_fd32619e33b50206d538cb47b9d"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ADD "anexos" text array`);
        await queryRunner.query(`DROP TABLE "anexo"`);
    }

}
