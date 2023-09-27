import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695815879749 implements MigrationInterface {
    name = 'InitialMigration1695815879749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe"`);
        await queryRunner.query(`ALTER TABLE "inquilino" DROP CONSTRAINT "FK_798fa4617d084225f776f028b91"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inquilino" ADD CONSTRAINT "FK_798fa4617d084225f776f028b91" FOREIGN KEY ("pessoa_juridica_id") REFERENCES "pessoa_juridica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d"`);
        await queryRunner.query(`ALTER TABLE "inquilino" DROP CONSTRAINT "FK_798fa4617d084225f776f028b91"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "inquilino" ADD CONSTRAINT "FK_798fa4617d084225f776f028b91" FOREIGN KEY ("pessoa_juridica_id") REFERENCES "pessoa_juridica"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
