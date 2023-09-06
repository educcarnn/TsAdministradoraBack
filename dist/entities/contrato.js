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
exports.Contrato = void 0;
const typeorm_1 = require("typeorm");
const pessoaFisica_1 = require("./pessoaFisica");
const imovel_1 = require("./imovel");
let Contrato = class Contrato {
};
exports.Contrato = Contrato;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contrato.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contrato.prototype, "tipoContrato", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }) // Armazena os objetos como JSON
    ,
    __metadata("design:type", Object)
], Contrato.prototype, "garantia", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }) // Armazena os objetos como JSON
    ,
    __metadata("design:type", Object)
], Contrato.prototype, "detalhesContrato", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoaFisica_1.Pessoa, (pessoa) => pessoa.contratosInquilinos),
    __metadata("design:type", pessoaFisica_1.Pessoa)
], Contrato.prototype, "inquilino", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoaFisica_1.Pessoa, (pessoa) => pessoa.contratosProprietarios),
    __metadata("design:type", pessoaFisica_1.Pessoa)
], Contrato.prototype, "proprietario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => imovel_1.RegistroImovel, (RegistroImovel) => RegistroImovel.contratos),
    __metadata("design:type", imovel_1.RegistroImovel)
], Contrato.prototype, "imovel", void 0);
exports.Contrato = Contrato = __decorate([
    (0, typeorm_1.Entity)()
], Contrato);
