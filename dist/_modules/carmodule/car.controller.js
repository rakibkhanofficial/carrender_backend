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
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const http_1 = require("../../helpers/http");
const httpCodes_1 = require("../../shared/constants/httpCodes");
const car_dto_1 = require("./car.dto");
const car_service_1 = require("./car.service");
const token_validation_guard_1 = require("../../guards/token-validation.guard");
const roles_guard_1 = require("../auth/jwt/roles.guard");
const roles_decorator_1 = require("../auth/jwt/roles.decorator");
let CarController = class CarController {
    constructor(carService) {
        this.carService = carService;
    }
    async getPublicList(request, response) {
        try {
            const cars = await this.carService.getPublicList();
            return response.status(200).json({
                statusCode: 200,
                message: 'Car list was successfully retrieved',
                data: cars,
            });
        }
        catch (error) {
            console.error('Error in getPublicList:', error);
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the car list',
                error: error.message,
            });
        }
    }
    async getPublicDetailsBySlug(request, response, slug) {
        try {
            const data = await this.carService.findBySlug(slug);
            return response.status(httpCodes_1.SUCCESS).json((0, http_1.success)(data));
        }
        catch (error) {
            console.log(error);
            return response.status(httpCodes_1.REQUEST_ERROR).json((0, http_1.requestInvalid)(error));
        }
    }
    async findAll(request, response) {
        try {
            const cars = await this.carService.findAll();
            return response.status(200).json({
                statusCode: 200,
                message: 'Car list was successfully retrieved',
                data: cars,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the car list',
                error: error.message,
            });
        }
    }
    async getCarsByCategory(categoryId, page = 1, limit = 10) {
        const result = await this.carService.findByCategory(categoryId, page, limit);
        return {
            ...result,
            data: result.data.map((car) => ({
                ...car,
                categoryName: car.category ? car.category.name : null,
                subCategoryName: car.subCategory ? car.subCategory.name : null,
            })),
        };
    }
    async getCarsBySubCategory(subCategoryId, page = 1, limit = 10) {
        const result = await this.carService.findBySubCategory(subCategoryId, page, limit);
        return {
            ...result,
            data: result.data.map((car) => ({
                ...car,
                categoryName: car.category ? car.category.name : null,
                subCategoryName: car.subCategory ? car.subCategory.name : null,
            })),
        };
    }
    async findOne(request, response, id) {
        try {
            const car = await this.carService.findById(id);
            return {
                statusCode: httpCodes_1.SUCCESS,
                data: {
                    ...car,
                    categoryName: car.category ? car.category.name : null,
                    subCategoryName: car.subCategory ? car.subCategory.name : null,
                },
            };
        }
        catch (error) {
            console.log(error);
            return response.status(httpCodes_1.REQUEST_ERROR).json((0, http_1.requestInvalid)(error));
        }
    }
    async create(request, response, carDto) {
        try {
            if (!request.user || !request.user.userId) {
                return response
                    .status(httpCodes_1.REQUEST_ERROR)
                    .json((0, http_1.requestInvalid)('User ID not found in token'));
            }
            const userId = request.user.userId;
            const existingCar = await this.carService.findByName(carDto.name);
            if (existingCar) {
                return response
                    .status(httpCodes_1.REQUEST_ERROR)
                    .json((0, http_1.requestInvalid)('Car already exists'));
            }
            const data = await this.carService.create(carDto, userId);
            return response.status(httpCodes_1.SUCCESS).json((0, http_1.success)(data));
        }
        catch (error) {
            console.log(error);
            return response.status(httpCodes_1.REQUEST_ERROR).json((0, http_1.requestInvalid)(error));
        }
    }
    async update(request, response, id, carDto) {
        try {
            const data = await this.carService.update(id, carDto);
            return response.status(httpCodes_1.SUCCESS).json((0, http_1.success)(data));
        }
        catch (error) {
            return response.status(httpCodes_1.REQUEST_ERROR).json((0, http_1.requestInvalid)(error));
        }
    }
    async remove(request, response, id) {
        try {
            await this.carService.remove(id);
            return response
                .status(httpCodes_1.SUCCESS)
                .json((0, http_1.success)({ message: 'Car deleted successfully' }));
        }
        catch (error) {
            return response.status(httpCodes_1.REQUEST_ERROR).json((0, http_1.requestInvalid)(error));
        }
    }
};
exports.CarController = CarController;
__decorate([
    (0, common_1.Get)('public-list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getPublicList", null);
__decorate([
    (0, common_1.Get)('public-details/:slug'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getPublicDetailsBySlug", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getCarsByCategory", null);
__decorate([
    (0, common_1.Get)('by-subcategory/:subCategoryId'),
    __param(0, (0, common_1.Param)('subCategoryId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getCarsBySubCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, car_dto_1.CarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, car_dto_1.CarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "remove", null);
exports.CarController = CarController = __decorate([
    (0, common_1.Controller)('cars'),
    __metadata("design:paramtypes", [car_service_1.CarService])
], CarController);
