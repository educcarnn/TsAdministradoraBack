import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694461328922 implements MigrationInterface {
    name = 'InitialMigration1694461328922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc"`);
        await queryRunner.query(`CREATE TABLE "contrato_inquilino" ("id" SERIAL NOT NULL, "percentual" integer NOT NULL, "contratoId" integer, "inquilinoId" integer, CONSTRAINT "PK_a37f1d6ae447141a03bc68374cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contrato_proprietario" ("id" SERIAL NOT NULL, "percentual" integer NOT NULL, "contratoId" integer, "proprietarioId" integer, CONSTRAINT "PK_a349a03236ea2b18522a146a481" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "inquilinoId"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "proprietarioId"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" ADD CONSTRAINT "FK_c34c39f02193cc823f5138f650b" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" ADD CONSTRAINT "FK_2dfda39386edff45bf19882b59e" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" DROP CONSTRAINT "FK_2dfda39386edff45bf19882b59e"`);
        await queryRunner.query(`ALTER TABLE "contrato_proprietario" DROP CONSTRAINT "FK_c34c39f02193cc823f5138f650b"`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005"`);
        await queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD "proprietarioId" integer`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD "inquilinoId" integer`);
        await queryRunner.query(`DROP TABLE "contrato_proprietario"`);
        await queryRunner.query(`DROP TABLE "contrato_inquilino"`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
