import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695909867239 implements MigrationInterface {
    name = 'InitialMigration1695909867239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_foto_registro_imovel"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe"`);
        await queryRunner.query(`ALTER TABLE "proprietario" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ADD "tipoPagamento" character varying`);
        await queryRunner.query(`ALTER TABLE "proprietario" ADD "percentual" character varying`);
        await queryRunner.query(`ALTER TABLE "proprietario" ADD "pessoa_id" integer`);
        await queryRunner.query(`ALTER TABLE "proprietario" ADD "registro_imovel_id" integer`);
        await queryRunner.query(`ALTER TABLE "proprietario" ADD "pessoa_juridica_id" integer`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario" ADD CONSTRAINT "FK_65668347c4d5b8528b060c45ecf" FOREIGN KEY ("pessoa_id") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario" ADD CONSTRAINT "FK_2ea18466cfd8d15b278389e2678" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario" ADD CONSTRAINT "FK_dc1c40fd4c22b091a1058b88a72" FOREIGN KEY ("pessoa_juridica_id") REFERENCES "pessoa_juridica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proprietario" DROP CONSTRAINT "FK_dc1c40fd4c22b091a1058b88a72"`);
        await queryRunner.query(`ALTER TABLE "proprietario" DROP CONSTRAINT "FK_2ea18466cfd8d15b278389e2678"`);
        await queryRunner.query(`ALTER TABLE "proprietario" DROP CONSTRAINT "FK_65668347c4d5b8528b060c45ecf"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "proprietario" DROP COLUMN "pessoa_juridica_id"`);
        await queryRunner.query(`ALTER TABLE "proprietario" DROP COLUMN "registro_imovel_id"`);
        await queryRunner.query(`ALTER TABLE "proprietario" DROP COLUMN "pessoa_id"`);
        await queryRunner.query(`ALTER TABLE "proprietario" DROP COLUMN "percentual"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" DROP COLUMN "tipoPagamento"`);
        await queryRunner.query(`ALTER TABLE "proprietario" ADD "status" character varying`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_foto_registro_imovel" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
