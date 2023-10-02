import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696205534248 implements MigrationInterface {
    name = 'InitialMigration1696205534248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" DROP COLUMN "novoSocioAdministrador"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ADD "novoSocioAdministrador" character varying NOT NULL`);
    }

}
