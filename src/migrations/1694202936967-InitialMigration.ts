import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694202936967 implements MigrationInterface {
    name = 'InitialMigration1694202936967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54"`);
        await queryRunner.query(`CREATE TABLE "contrato_inquilino" ("id" SERIAL NOT NULL, "percentual" numeric(5,2) NOT NULL, "inquilinoId" integer, "contratoId" integer, CONSTRAINT "PK_a37f1d6ae447141a03bc68374cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "inquilinoId"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f"`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD "inquilinoId" integer`);
        await queryRunner.query(`DROP TABLE "contrato_inquilino"`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
