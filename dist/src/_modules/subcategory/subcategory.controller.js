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
exports.SubCategoryController = void 0;
const common_1 = require("@nestjs/common");
const token_validation_guard_1 = require("../../guards/token-validation.guard");
const roles_guard_1 = require("../auth/jwt/roles.guard");
const roles_decorator_1 = require("../auth/jwt/roles.decorator");
const subcategory_dto_1 = require("./subcategory.dto");
const subcategory_service_1 = require("./subcategory.service");
let SubCategoryController = class SubCategoryController {
    constructor(subCategoryService) {
        this.subCategoryService = subCategoryService;
    }
    async findAll() {
        const responsedata = await this.subCategoryService.findAll();
        return {
            statusCode: 200,
            message: 'Subcategory list was successfully retrieved',
            data: responsedata,
        };
    }
    async findAllByCategoryId(id) {
        const responsedata = await this.subCategoryService.findBycategoryId(id);
        return {
            statusCode: 200,
            message: 'Subcategory was successfully retrieved By categoryId',
            data: responsedata,
        };
    }
    async findOne(id) {
        const responsedata = await this.subCategoryService.findById(id);
        return {
            statusCode: 200,
            message: 'Subcategory was successfully retrieved',
            data: responsedata,
        };
    }
    async create(request, subCategoryDto) {
        try {
            if (!request.user || !request.user.userId) {
                return {
                    statusCode: 401,
                    error: 'Unauthorized',
                };
            }
            const userId = request.user.userId;
            const existingSubCategory = await this.subCategoryService.findByName(subCategoryDto.name);
            if (existingSubCategory) {
                throw new common_1.ConflictException('Sub-Category already exists');
            }
            const data = await this.subCategoryService.create(subCategoryDto, userId);
            return {
                statusCode: 200,
                message: 'Subcategory was successfully created',
                data,
            };
        }
        catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                error: 'Internal Server Error',
            };
        }
    }
    async update(id, subCategoryDto) {
        const updatedData = await this.subCategoryService.update(id, subCategoryDto);
        return {
            statusCode: 200,
            message: 'Subcategory was successfully updated',
            data: updatedData,
        };
    }
    async remove(id) {
        const response = await this.subCategoryService.remove(id);
        return {
            statusCode: 200,
            message: 'Subcategory was successfully deleted',
            data: response,
        };
    }
};
exports.SubCategoryController = SubCategoryController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('subcategorybycategoryId/:id'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "findAllByCategoryId", null);
__decorate([
    (0, common_1.Get)('details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('createSubCategory'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subcategory_dto_1.SubCategoryDto]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, subcategory_dto_1.SubCategoryDto]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "remove", null);
exports.SubCategoryController = SubCategoryController = __decorate([
    (0, common_1.Controller)('subcategories'),
    __metadata("design:paramtypes", [subcategory_service_1.SubCategoryService])
], SubCategoryController);
//# sourceMappingURL=subcategory.controller.js.map