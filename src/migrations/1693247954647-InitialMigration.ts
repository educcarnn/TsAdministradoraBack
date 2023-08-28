import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1693247954647 implements MigrationInterface {
    name = 'InitialMigration1693247954647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
