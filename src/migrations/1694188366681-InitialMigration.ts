import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694188366681 implements MigrationInterface {
    name = 'InitialMigration1694188366681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25"`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "proprietarioId"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "proprietarioId" integer`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
