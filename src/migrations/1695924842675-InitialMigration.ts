import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695924842675 implements MigrationInterface {
    name = 'InitialMigration1695924842675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
    }

}
