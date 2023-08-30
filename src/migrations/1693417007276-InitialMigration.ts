import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1693417007276 implements MigrationInterface {
    name = 'InitialMigration1693417007276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" ADD "password" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."pessoa_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD "role" "public"."pessoa_role_enum" DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."pessoa_role_enum"`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP COLUMN "password"`);
    }

}
