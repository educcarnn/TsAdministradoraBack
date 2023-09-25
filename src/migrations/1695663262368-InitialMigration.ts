import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695663262368 implements MigrationInterface {
    name = 'InitialMigration1695663262368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "servico" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "registro_imovel_id" integer, CONSTRAINT "PK_289d0aa6d49f9d0fd65aefc6677" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "servico" ADD CONSTRAINT "FK_fe02edaddbe1633f140e914a76b" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servico" DROP CONSTRAINT "FK_fe02edaddbe1633f140e914a76b"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "servico"`);
    }

}
