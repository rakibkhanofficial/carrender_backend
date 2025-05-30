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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const token_validation_guard_1 = require("../../guards/token-validation.guard");
const roles_guard_1 = require("../auth/jwt/roles.guard");
const roles_decorator_1 = require("../auth/jwt/roles.decorator");
const category_service_1 = require("./category.service");
const category_dto_1 = require("./category.dto");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async findAll() {
        const responsedata = await this.categoryService.findAll();
        return {
            statusCode: 200,
            message: 'Category list was successfully retrieved',
            data: responsedata,
        };
    }
    async PubliccategoryList() {
        const responsedata = await this.categoryService.findPublicCategoryList();
        return {
            statusCode: 200,
            message: 'Category list was successfully retrieved',
            data: responsedata,
        };
    }
    async findOne(id) {
        return this.categoryService.findById(id);
    }
    async create(request, categoryDto) {
        try {
            if (!request.user || !request.user.userId) {
                return {
                    statusCode: 401,
                    error: 'Unauthorized',
                };
            }
            const userId = request.user.userId;
            const existingCategory = await this.categoryService.findByName(categoryDto.name);
            if (existingCategory) {
                throw new common_1.ConflictException('Category already exists');
            }
            const data = await this.categoryService.create(categoryDto, userId);
            return {
                statusCode: 200,
                message: 'Category was successfully created',
                data,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                return {
                    statusCode: 409,
                    message: error.message,
                };
            }
            console.log(error);
            return {
                statusCode: 500,
                error: 'Internal Server Error',
            };
        }
    }
    async update(id, categoryDto) {
        const updatedData = await this.categoryService.update(id, categoryDto);
        return {
            statusCode: 200,
            message: 'Category was successfully updated',
            data: updatedData,
        };
    }
    async remove(id) {
        const response = await this.categoryService.remove(id);
        return {
            statusCode: 200,
            message: 'Category was successfully deleted',
            data: response,
        };
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/publicCategory'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "PubliccategoryList", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('createCategory'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_dto_1.CategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, category_dto_1.CategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map