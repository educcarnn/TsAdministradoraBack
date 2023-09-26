import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695732830759 implements MigrationInterface {
    name = 'InitialMigration1695732830759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_foto_registro_imovel"`);
        await queryRunner.query(`ALTER TABLE "servico" DROP CONSTRAINT "FK_fe02edaddbe1633f140e914a76b"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anexo" ADD CONSTRAINT "FK_976e9f759caa6e80133fcef9123" FOREIGN KEY ("imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "servico" ADD CONSTRAINT "FK_fe02edaddbe1633f140e914a76b" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servico" DROP CONSTRAINT "FK_fe02edaddbe1633f140e914a76b"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_e30ca77ef2db234190548b3ccbe"`);
        await queryRunner.query(`ALTER TABLE "anexo" DROP CONSTRAINT "FK_976e9f759caa6e80133fcef9123"`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d"`);
        await queryRunner.query(`ALTER TABLE "fiador" ALTER COLUMN "numeroMatriculaRGI" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "servico" ADD CONSTRAINT "FK_fe02edaddbe1633f140e914a76b" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_foto_registro_imovel" FOREIGN KEY ("registro_imovel_id") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
