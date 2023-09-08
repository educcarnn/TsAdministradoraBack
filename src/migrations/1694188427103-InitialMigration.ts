import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694188427103 implements MigrationInterface {
    name = 'InitialMigration1694188427103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
    }

}
