import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695310319946 implements MigrationInterface {
    name = 'InitialMigration1695310319946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foto" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "percentual"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "percentual" integer`);
        await queryRunner.query(`ALTER TABLE "foto" ADD "nome" character varying NOT NULL`);
    }

}
