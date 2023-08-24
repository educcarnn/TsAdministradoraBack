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
exports.RegistroImovel = void 0;
const typeorm_1 = require("typeorm");
const pessoaFisica_1 = require("./pessoaFisica");
const contrato_1 = require("./contrato");
let RegistroImovel = exports.RegistroImovel = class RegistroImovel {
    id;
    tipoImovel;
    generoImovel;
    caracteristicas;
    negociacao;
    tipoIptu;
    iptu;
    tipoCondominio;
    condominio;
    localizacao;
    percentual;
    caracteristicas_imovel;
    caracteristicas_condominio;
    fotos;
    proprietario;
    contratos;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RegistroImovel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RegistroImovel.prototype, "tipoImovel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RegistroImovel.prototype, "generoImovel", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], RegistroImovel.prototype, "caracteristicas", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], RegistroImovel.prototype, "negociacao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RegistroImovel.prototype, "tipoIptu", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], RegistroImovel.prototype, "iptu", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RegistroImovel.prototype, "tipoCondominio", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], RegistroImovel.prototype, "condominio", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], RegistroImovel.prototype, "localizacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], RegistroImovel.prototype, "percentual", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: true }),
    __metadata("design:type", Array)
], RegistroImovel.prototype, "caracteristicas_imovel", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: true }),
    __metadata("design:type", Array)
], RegistroImovel.prototype, "caracteristicas_condominio", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: true }),
    __metadata("design:type", Array)
], RegistroImovel.prototype, "fotos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoaFisica_1.Pessoa, (pessoa) => pessoa.imoveisProprietarios),
    __metadata("design:type", pessoaFisica_1.Pessoa)
], RegistroImovel.prototype, "proprietario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_1.Contrato, (contrato) => contrato.imovel),
    __metadata("design:type", Array)
], RegistroImovel.prototype, "contratos", void 0);
exports.RegistroImovel = RegistroImovel = __decorate([
    (0, typeorm_1.Entity)()
], RegistroImovel);
