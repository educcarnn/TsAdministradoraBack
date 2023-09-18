import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694995496346 implements MigrationInterface {
    name = 'InitialMigration1694995496346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "empresaId" integer`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c61de3f105d4df98f8f62c95d77" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c61de3f105d4df98f8f62c95d77"`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "empresaId"`);
    }

}
