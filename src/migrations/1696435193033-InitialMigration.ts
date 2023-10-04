import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696435193033 implements MigrationInterface {
    name = 'InitialMigration1696435193033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_676ce4103675cb4d3c821dc42ac"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "empresaAdministradaId" TO "empresaId"`);
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
      
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c61de3f105d4df98f8f62c95d77" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c61de3f105d4df98f8f62c95d77"`);
      
        await queryRunner.query(`ALTER TABLE "pessoa_intermediaria" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "empresaId" TO "empresaAdministradaId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_676ce4103675cb4d3c821dc42ac" FOREIGN KEY ("empresaAdministradaId") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
