import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696527675910 implements MigrationInterface {
    name = 'InitialMigration1696527675910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."pessoa_juridica_role_enum" AS ENUM('admin', 'user', 'userjur')`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "role" "public"."pessoa_juridica_role_enum" DEFAULT 'userjur'`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user', 'userjur')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."pessoa_role_enum" RENAME TO "pessoa_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."pessoa_role_enum" AS ENUM('admin', 'user', 'userjur')`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "role" TYPE "public"."pessoa_role_enum" USING "role"::"text"::"public"."pessoa_role_enum"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."pessoa_role_enum_old"`);
 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TYPE "public"."pessoa_role_enum_old" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "role" TYPE "public"."pessoa_role_enum_old" USING "role"::"text"::"public"."pessoa_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."pessoa_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."pessoa_role_enum_old" RENAME TO "pessoa_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('admin', 'user', 'Jurídica')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."pessoa_juridica_role_enum"`);
    }

}
