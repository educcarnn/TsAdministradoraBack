import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695131307266 implements MigrationInterface {
    name = 'InitialMigration1695131307266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "ads"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "docs"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "anuncio" jsonb`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "anexos" text array`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "anexos"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "anuncio"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "docs" text array`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "ads" jsonb`);
    }

}
