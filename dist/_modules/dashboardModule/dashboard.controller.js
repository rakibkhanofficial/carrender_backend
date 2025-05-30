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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const token_validation_guard_1 = require("../../guards/token-validation.guard");
const roles_guard_1 = require("../auth/jwt/roles.guard");
const roles_decorator_1 = require("../auth/jwt/roles.decorator");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getAdminDashboard(request) {
        try {
            const dashboardData = await this.dashboardService.getAdminDashboardData();
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Admin dashboard data retrieved successfully',
                data: dashboardData,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while fetching admin dashboard data',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserDashboard(request) {
        try {
            const userId = request.user.userId;
            const dashboardData = await this.dashboardService.getUserDashboardData(userId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User dashboard data retrieved successfully',
                data: dashboardData,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while fetching user dashboard data',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDriverDashboard(request) {
        try {
            const userId = request.user.userId;
            const dashboardData = await this.dashboardService.getUserDashboardData(userId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User dashboard data retrieved successfully',
                data: dashboardData,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while fetching user dashboard data',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAdminBookingListType(request) {
        try {
            const bookingListType = await this.dashboardService.getAdminBookingListType();
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Admin booking list type data retrieved successfully',
                data: bookingListType,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while fetching admin booking list type data',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserBookingListType(request) {
        try {
            const userId = request.user.userId;
            const bookingListType = await this.dashboardService.getUserBookingListType(userId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User booking list type data retrieved successfully',
                data: bookingListType,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while fetching user booking list type data',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDriverBookingListType(request) {
        try {
            const userId = request.user.userId;
            const bookingListType = await this.dashboardService.getDriverBookingListType(userId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User booking list type data retrieved successfully',
                data: bookingListType,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while fetching user booking list type data',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('admin'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAdminDashboard", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, roles_decorator_1.Roles)('Customer'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getUserDashboard", null);
__decorate([
    (0, common_1.Get)('driver'),
    (0, roles_decorator_1.Roles)('Driver'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDriverDashboard", null);
__decorate([
    (0, common_1.Get)('admin/booking-list-type'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAdminBookingListType", null);
__decorate([
    (0, common_1.Get)('user/booking-list-type'),
    (0, roles_decorator_1.Roles)('Customer'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getUserBookingListType", null);
__decorate([
    (0, common_1.Get)('driver/booking-list-type'),
    (0, roles_decorator_1.Roles)('Driver'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDriverBookingListType", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map