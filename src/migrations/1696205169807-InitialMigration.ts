import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696205169807 implements MigrationInterface {
    name = 'InitialMigration1696205169807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe"`);
        await queryRunner.query(`ALTER TABLE "servico" DROP CONSTRAINT "FK_fe02edaddbe1633f140e914a76b"`);
        await queryRunner.query(`CREATE TABLE "socio" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "pessoaJuridicaId" integer, CONSTRAINT "PK_78861ff9fd2d05808c237dd29df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_c239c160554597688f846d7bff1" FOREIGN KEY ("pessoaJuridicaId") REFERENCES "pessoa_juridica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "servico" ADD CONSTRAINT "FK_fe02edaddbe1633f140e914a76b" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      
        await queryRunner.query(`ALTER TABLE "socio" ADD CONSTRAINT "FK_c4496abc93adbda1ae77d342a68" FOREIGN KEY ("pessoaJuridicaId") REFERENCES "pessoa_juridica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "socio" DROP CONSTRAINT "FK_c4496abc93adbda1ae77d342a68"`);

        await queryRunner.query(`ALTER TABLE "servico" DROP CONSTRAINT "FK_fe02edaddbe1633f140e914a76b"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_c239c160554597688f846d7bff1"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "socio"`);
        await queryRunner.query(`ALTER TABLE "servico" ADD CONSTRAINT "FK_fe02edaddbe1633f140e914a76b" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
