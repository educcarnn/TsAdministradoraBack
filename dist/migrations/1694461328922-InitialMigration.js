"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1694461328922 = void 0;
class InitialMigration1694461328922 {
    constructor() {
        this.name = 'InitialMigration1694461328922';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54"`);
            yield queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc"`);
            yield queryRunner.query(`CREATE TABLE "contrato_inquilino" ("id" SERIAL NOT NULL, "percentual" integer NOT NULL, "contratoId" integer, "inquilinoId" integer, CONSTRAINT "PK_a37f1d6ae447141a03bc68374cf" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "contrato_proprietario" ("id" SERIAL NOT NULL, "percentual" integer NOT NULL, "contratoId" integer, "proprietarioId" integer, CONSTRAINT "PK_a349a03236ea2b18522a146a481" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "inquilinoId"`);
            yield queryRunner.query(`ALTER TABLE "contrato" DROP COLUMN "proprietarioId"`);
            yield queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
            yield queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "contrato_inquilino" ADD CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "contrato_proprietario" ADD CONSTRAINT "FK_c34c39f02193cc823f5138f650b" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "contrato_proprietario" ADD CONSTRAINT "FK_2dfda39386edff45bf19882b59e" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "contrato_proprietario" DROP CONSTRAINT "FK_2dfda39386edff45bf19882b59e"`);
            yield queryRunner.query(`ALTER TABLE "contrato_proprietario" DROP CONSTRAINT "FK_c34c39f02193cc823f5138f650b"`);
            yield queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_6d20dc8904e96ffeb5a0b249005"`);
            yield queryRunner.query(`ALTER TABLE "contrato_inquilino" DROP CONSTRAINT "FK_cf48604d0ac78adda0f11ccaf7f"`);
            yield queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
            yield queryRunner.query(`ALTER TABLE "contrato" ADD "proprietarioId" integer`);
            yield queryRunner.query(`ALTER TABLE "contrato" ADD "inquilinoId" integer`);
            yield queryRunner.query(`DROP TABLE "contrato_proprietario"`);
            yield queryRunner.query(`DROP TABLE "contrato_inquilino"`);
            yield queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_fd5a210b8c55dc131f51b837b54" FOREIGN KEY ("inquilinoId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.InitialMigration1694461328922 = InitialMigration1694461328922;
