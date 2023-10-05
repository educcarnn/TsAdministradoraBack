import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696520637502 implements MigrationInterface {
    name = 'InitialMigration1696520637502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ALTER COLUMN "password" DROP DEFAULT`);
        
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.query(`ALTER TABLE "pessoa_juridica" ALTER COLUMN "password" SET DEFAULT 'senha123'`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
    }

}
