import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695003754074 implements MigrationInterface {
    name = 'InitialMigration1695003754074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_959e1e38b0141d07dcacf8e7b3f"`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "UQ_959e1e38b0141d07dcacf8e7b3f"`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP COLUMN "fiadorId"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "fiador" DROP CONSTRAINT "FK_52e30e8b845fab07bfec11dcf87"`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fiador" DROP CONSTRAINT "UQ_52e30e8b845fab07bfec11dcf87"`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fiador" ADD CONSTRAINT "FK_52e30e8b845fab07bfec11dcf87" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "fiador" DROP CONSTRAINT "FK_52e30e8b845fab07bfec11dcf87"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiador" ADD CONSTRAINT "UQ_52e30e8b845fab07bfec11dcf87" UNIQUE ("pessoaId")`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fiador" ADD CONSTRAINT "FK_52e30e8b845fab07bfec11dcf87" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD "fiadorId" integer`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "UQ_959e1e38b0141d07dcacf8e7b3f" UNIQUE ("fiadorId")`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_959e1e38b0141d07dcacf8e7b3f" FOREIGN KEY ("fiadorId") REFERENCES "fiador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
