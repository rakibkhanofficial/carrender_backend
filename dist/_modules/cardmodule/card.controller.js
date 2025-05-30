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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardController = void 0;
const common_1 = require("@nestjs/common");
const card_service_1 = require("./card.service");
const card_dto_1 = require("./card.dto");
const token_validation_guard_1 = require("../../guards/token-validation.guard");
const roles_guard_1 = require("../auth/jwt/roles.guard");
const roles_decorator_1 = require("../auth/jwt/roles.decorator");
let CardController = class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    create(createCardDto, req) {
        createCardDto.userId = req.user.userId;
        return this.cardService.create(createCardDto);
    }
    findAll() {
        return this.cardService.findAll();
    }
    findAllByUser(req) {
        return this.cardService.findAllByUserId(req.user.userId);
    }
    findOne(id, req) {
        return this.cardService.findOne(+id, req.user.userId);
    }
    update(id, updateCardDto, req) {
        return this.cardService.update(+id, updateCardDto, req.user.userId);
    }
    remove(id, req) {
        return this.cardService.remove(+id, req.user.userId);
    }
};
exports.CardController = CardController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [card_dto_1.CreateCardDto, Object]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, card_dto_1.UpdateCardDto, Object]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "remove", null);
exports.CardController = CardController = __decorate([
    (0, common_1.Controller)('cards'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard),
    __metadata("design:paramtypes", [card_service_1.CardService])
], CardController);
