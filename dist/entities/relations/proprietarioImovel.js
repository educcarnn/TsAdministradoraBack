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
exports.ProprietarioImovel = void 0;
const typeorm_1 = require("typeorm");
const pessoaFisica_1 = require("../pessoaFisica");
const imovel_1 = require("../imovel");
let ProprietarioImovel = class ProprietarioImovel {
};
exports.ProprietarioImovel = ProprietarioImovel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProprietarioImovel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoaFisica_1.Pessoa, pessoa => pessoa.imoveisRelacionados),
    (0, typeorm_1.JoinColumn)({ name: 'pessoaId' }),
    __metadata("design:type", pessoaFisica_1.Pessoa)
], ProprietarioImovel.prototype, "pessoa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => imovel_1.RegistroImovel, registroImovel => registroImovel.imoveisProprietarios),
    (0, typeorm_1.JoinColumn)({ name: 'registroImovelId' }),
    __metadata("design:type", imovel_1.RegistroImovel)
], ProprietarioImovel.prototype, "registroImovel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], ProprietarioImovel.prototype, "percentualPropriedade", void 0);
exports.ProprietarioImovel = ProprietarioImovel = __decorate([
    (0, typeorm_1.Entity)()
], ProprietarioImovel);