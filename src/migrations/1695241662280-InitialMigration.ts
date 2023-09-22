import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695241662280 implements MigrationInterface {
    name = 'InitialMigration1695241662280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "foto" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "url" character varying NOT NULL, "registro_imovel_id" integer, CONSTRAINT "PK_2496ab6b734626c5adcd6c0a37f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "foto"`);
    }

}
