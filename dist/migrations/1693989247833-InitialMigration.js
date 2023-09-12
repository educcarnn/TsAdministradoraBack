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
exports.InitialMigration1693989247833 = void 0;
class InitialMigration1693989247833 {
    constructor() {
        this.name = 'InitialMigration1693989247833';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "pessoa" DROP COLUMN "funcoes"`);
            yield queryRunner.query(`ALTER TABLE "pessoa" DROP COLUMN "funcao"`);
            yield queryRunner.query(`ALTER TABLE "pessoa" ADD "funcao" text array NOT NULL DEFAULT ARRAY[]::text[]`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "pessoa" DROP COLUMN "funcao"`);
            yield queryRunner.query(`ALTER TABLE "pessoa" ADD "funcao" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "pessoa" ADD "funcoes" text array NOT NULL`);
        });
    }
}
exports.InitialMigration1693989247833 = InitialMigration1693989247833;
