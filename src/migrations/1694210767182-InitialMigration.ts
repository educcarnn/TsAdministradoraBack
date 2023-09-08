import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694210767182 implements MigrationInterface {
    name = 'InitialMigration1694210767182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato" ADD "inquilinoId" integer`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD "proprietarioId" integer`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" ADD CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "proprietarioId"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "inquilinoId"`);
    }

}
