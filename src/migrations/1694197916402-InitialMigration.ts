import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1694197916402 implements MigrationInterface {
    name = 'InitialMigration1694197916402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proprietario_imovel" ("id" SERIAL NOT NULL, "percentualPropriedade" double precision NOT NULL, "pessoaId" integer, "registroImovelId" integer, CONSTRAINT "PK_cec31e53f80ffccd08350c78ac3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_40840f70cfd3d48b74252c7d593" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_40840f70cfd3d48b74252c7d593"`);
        await queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "proprietario_imovel"`);
    }

}
