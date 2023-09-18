import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695064664261 implements MigrationInterface {
    name = 'InitialMigration1695064664261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD "pessoaJuridicaId" integer`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_c239c160554597688f846d7bff1" FOREIGN KEY ("pessoaJuridicaId") REFERENCES "pessoa_juridica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoa" DROP CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_c239c160554597688f846d7bff1"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "dadosComunsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa" ADD CONSTRAINT "FK_b8d5405d72ef06b41b331685b9e" FOREIGN KEY ("dadosComunsId") REFERENCES "pessoa_intermediaria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP COLUMN "pessoaJuridicaId"`);
    }

}
