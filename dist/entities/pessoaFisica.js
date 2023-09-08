"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
const typeorm_1 = require("typeorm");
const contrato_1 = require("./contrato");
const proprietarioImovel_1 = require("./relations/proprietarioImovel");
const contratoInquilino_1 = require("./relations/contratoInquilino");
let Pessoa = class Pessoa {
};
exports.Pessoa = Pessoa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pessoa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, default: () => "ARRAY[]::text[]" }),
    __metadata("design:type", Array)
], Pessoa.prototype, "funcao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "identidade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "orgaoExpedidor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "dataNascimento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "profissao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "estadoCivil", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb"),
    __metadata("design:type", Object)
], Pessoa.prototype, "filiacao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "nacionalidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Pessoa.prototype, "telefoneFixo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "telefoneCelular", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Pessoa.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Pessoa.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["admin", "user"],
        default: "user",
        nullable: true,
    }),
    __metadata("design:type", String)
], Pessoa.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pessoa.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], Pessoa.prototype, "endereco", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], Pessoa.prototype, "dadoBancarios", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Array)
], Pessoa.prototype, "anexos", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Array)
], Pessoa.prototype, "lista_email", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Array)
], Pessoa.prototype, "lista_repasse", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proprietarioImovel_1.ProprietarioImovel, pi => pi.pessoa),
    __metadata("design:type", Array)
], Pessoa.prototype, "imoveisRelacionados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_1.Contrato, (contrato) => contrato.proprietario),
    __metadata("design:type", Array)
], Pessoa.prototype, "contratosProprietarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contratoInquilino_1.ContratoInquilino, (ci) => ci.inquilino),
    __metadata("design:type", Array)
], Pessoa.prototype, "contratosInquilinos", void 0);
exports.Pessoa = Pessoa = __decorate([
    (0, typeorm_1.Entity)()
], Pessoa);
