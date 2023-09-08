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
exports.InitialMigration1694188366681 = void 0;
class InitialMigration1694188366681 {
    constructor() {
        this.name = 'InitialMigration1694188366681';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "registro_imovel" DROP CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25"`);
            yield queryRunner.query(`ALTER TABLE "registro_imovel" DROP COLUMN "proprietarioId"`);
            yield queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]::text[]`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "pessoa" ALTER COLUMN "funcao" SET DEFAULT ARRAY[]`);
            yield queryRunner.query(`ALTER TABLE "registro_imovel" ADD "proprietarioId" integer`);
            yield queryRunner.query(`ALTER TABLE "registro_imovel" ADD CONSTRAINT "FK_c4d892cac30faf1ab15d07b6b25" FOREIGN KEY ("proprietarioId") REFERENCES "pessoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.InitialMigration1694188366681 = InitialMigration1694188366681;
