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
exports.PessoaJuridica = void 0;
const typeorm_1 = require("typeorm");
let PessoaJuridica = exports.PessoaJuridica = class PessoaJuridica {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PessoaJuridica.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PessoaJuridica.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PessoaJuridica.prototype, "funcao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PessoaJuridica.prototype, "cnpj", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PessoaJuridica.prototype, "razaoSocial", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PessoaJuridica.prototype, "nomeFantasia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PessoaJuridica.prototype, "dataAberturaEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PessoaJuridica.prototype, "novoSocioAdministrador", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PessoaJuridica.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PessoaJuridica.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], PessoaJuridica.prototype, "endereco", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], PessoaJuridica.prototype, "dadoBancarios", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Array)
], PessoaJuridica.prototype, "anexos", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Array)
], PessoaJuridica.prototype, "lista_email", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Array)
], PessoaJuridica.prototype, "lista_repasse", void 0);
exports.PessoaJuridica = PessoaJuridica = __decorate([
    (0, typeorm_1.Entity)()
], PessoaJuridica);
