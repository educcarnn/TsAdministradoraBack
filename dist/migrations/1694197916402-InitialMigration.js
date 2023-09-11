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
exports.InitialMigration1694197916402 = void 0;
class InitialMigration1694197916402 {
    constructor() {
        this.name = 'InitialMigration1694197916402';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "proprietario_imovel" ("id" SERIAL NOT NULL, "percentualPropriedade" double precision NOT NULL, "pessoaId" integer, "registroImovelId" integer, CONSTRAINT "PK_cec31e53f80ffccd08350c78ac3" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
            yield queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_40840f70cfd3d48b74252c7d593" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "proprietario_imovel" ADD CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d" FOREIGN KEY ("registroImovelId") REFERENCES "registro_imovel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_ca92b4b689df426420f3a3ba28d"`);
            yield queryRunner.query(`ALTER TABLE "proprietario_imovel" DROP CONSTRAINT "FK_40840f70cfd3d48b74252c7d593"`);
            yield queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
            yield queryRunner.query(`DROP TABLE "proprietario_imovel"`);
        });
    }
}
exports.InitialMigration1694197916402 = InitialMigration1694197916402;
