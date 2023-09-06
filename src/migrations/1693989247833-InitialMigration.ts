import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1693989247833 implements MigrationInterface {
    name = 'InitialMigration1693989247833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" DROP COLUMN "funcoes"`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP COLUMN "funcao"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD "funcao" text array NOT NULL DEFAULT ARRAY[]::text[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" DROP COLUMN "funcao"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD "funcao" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD "funcoes" text array NOT NULL`);
    }

}
