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
exports.CarBookingController = void 0;
const common_1 = require("@nestjs/common");
const car_booking_service_1 = require("./car_booking.service");
const car_booking_dto_1 = require("./car_booking.dto");
const token_validation_guard_1 = require("../../guards/token-validation.guard");
const roles_guard_1 = require("../auth/jwt/roles.guard");
const roles_decorator_1 = require("../auth/jwt/roles.decorator");
let CarBookingController = class CarBookingController {
    constructor(carBookingService) {
        this.carBookingService = carBookingService;
    }
    async create(createCarBookingDto, req) {
        if (createCarBookingDto.paymentMethod !== 'cash') {
            throw new Error('This endpoint is for cash payments only. For online payments, use the payments/process-online-payment endpoint.');
        }
        const booking = await this.carBookingService.CashBookingcreate(createCarBookingDto, req.user.userId);
        return {
            statusCode: 201,
            message: 'Car booking was successfully created',
            data: booking,
        };
    }
    async findAll(request, response, page, limit) {
        try {
            if (!request.user || !request.user.userId) {
                return {
                    statusCode: 401,
                    error: 'Unauthorized',
                };
            }
            const data = await this.carBookingService.findAll(request.user.userId, page, limit);
            return response.status(200).json({
                statusCode: 200,
                message: 'Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the car booking list',
                error: error.message,
            });
        }
    }
    async findAllBookingForAdmin(response, page, limit) {
        try {
            const data = await this.carBookingService.findAllBookingforadmin(page, limit);
            return response.status(200).json({
                statusCode: 200,
                message: 'Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the car booking list',
                error: error.message,
            });
        }
    }
    async findAllPendingBookingForAdmin(response, page, limit) {
        try {
            const data = await this.carBookingService.findAllPendingBookingforadmin(page, limit);
            return response.status(200).json({
                statusCode: 200,
                message: 'Pending Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the Pending car booking list',
                error: error.message,
            });
        }
    }
    async findAllAcceptedBookingForAdmin(response, page, limit) {
        try {
            const data = await this.carBookingService.findAllAcceptedBookingforadmin(page, limit);
            return response.status(200).json({
                statusCode: 200,
                message: 'Accepted Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the Accepted car booking list',
                error: error.message,
            });
        }
    }
    async findAllAssignedBookingForAdmin(response, page, limit) {
        try {
            const data = await this.carBookingService.findAllAssignedBookingforadmin(page, limit);
            return response.status(200).json({
                statusCode: 200,
                message: 'Assigned Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the Assigned car booking list',
                error: error.message,
            });
        }
    }
    async findAllAssignedBookingForDriver(response, request, page, limit) {
        try {
            const data = await this.carBookingService.findAllAssignedBookingfordriver(page, limit, request.user.userId);
            return response.status(200).json({
                statusCode: 200,
                message: ' Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the car booking list',
                error: error.message,
            });
        }
    }
    async findAllCompleteBookingForAdmin(response, page, limit) {
        try {
            const data = await this.carBookingService.findAllCompletedBookingforadmin(page, limit);
            return response.status(200).json({
                statusCode: 200,
                message: 'Completed Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the Completed car booking list',
                error: error.message,
            });
        }
    }
    async findAllCompleteBookingForDriver(response, request, page, limit) {
        try {
            const data = await this.carBookingService.findAllCompletedBookingfordriver(page, limit, request.user.userId);
            return response.status(200).json({
                statusCode: 200,
                message: 'Completed Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the Completed car booking list',
                error: error.message,
            });
        }
    }
    async findAllCanceledBookingForAdmin(response, page, limit) {
        try {
            const data = await this.carBookingService.findAllCancelBookingforadmin(page, limit);
            return response.status(200).json({
                statusCode: 200,
                message: 'Canceled Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the Canceled car booking list',
                error: error.message,
            });
        }
    }
    async findAllCanceledBookingForDriver(response, request, page, limit) {
        try {
            const data = await this.carBookingService.findAllCanceledBookingfordriver(page, limit, request.user.userId);
            return response.status(200).json({
                statusCode: 200,
                message: 'Completed Car booking list was successfully retrieved',
                data,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the Completed car booking list',
                error: error.message,
            });
        }
    }
    async adminfindOne(response, id) {
        try {
            const booking = await this.carBookingService.adminfindOne(+id);
            return response.status(200).json({
                statusCode: 200,
                message: 'Car booking was successfully retrieved',
                data: booking,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the car booking',
                error: error.message,
            });
        }
    }
    async findOne(request, response, id) {
        try {
            const booking = await this.carBookingService.findOne(+id, request.user.userId);
            return response.status(200).json({
                statusCode: 200,
                message: 'Car booking was successfully retrieved',
                data: booking,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the car booking',
                error: error.message,
            });
        }
    }
    async findAssignOneforDriver(request, response, id) {
        try {
            const booking = await this.carBookingService.findAssignOneBydriverId(+id, request.user.userId);
            return response.status(200).json({
                statusCode: 200,
                message: 'Car booking was successfully retrieved',
                data: booking,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while fetching the car booking',
                error: error.message,
            });
        }
    }
    async updateStatus(id, status) {
        try {
            const booking = await this.carBookingService.updateStatus(+id, status);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Car booking status was successfully updated',
                data: booking,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while updating the car booking status',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async assignDriver(id, driverId) {
        try {
            const booking = await this.carBookingService.assigndriver(+id, driverId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Car booking Driver was successfully updated',
                data: booking,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while updating the car booking Driver',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(request, response, id, updateCarBookingDto) {
        try {
            const booking = await this.carBookingService.update(+id, updateCarBookingDto, request.user.userId);
            return response.status(200).json({
                statusCode: 200,
                message: 'Car booking was successfully updated',
                data: booking,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while updating the car booking',
                error: error.message,
            });
        }
    }
    async remove(request, response, id) {
        try {
            await this.carBookingService.remove(+id, request.user.userId);
            return response.status(200).json({
                statusCode: 200,
                message: 'Car booking was successfully deleted',
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while deleting the car booking',
                error: error.message,
            });
        }
    }
    async updatePaymentStatus(response, id, paymentStatus, paymentId) {
        try {
            const booking = await this.carBookingService.updatePaymentStatus(+id, paymentStatus, paymentId);
            return response.status(200).json({
                statusCode: 200,
                message: 'Car booking payment status was successfully updated',
                data: booking,
            });
        }
        catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: 'An error occurred while updating the car booking payment status',
                error: error.message,
            });
        }
    }
};
exports.CarBookingController = CarBookingController;
__decorate([
    (0, common_1.Post)('createbookingbycash'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Customer', 'Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_booking_dto_1.CreateCarBookingDto, Object]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/carBookingsbyuser/:page/:limit'),
    (0, roles_decorator_1.Roles)('Customer'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('page')),
    __param(3, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/admincarbookinglist/:page/:limit'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAllBookingForAdmin", null);
__decorate([
    (0, common_1.Get)('/admincarbookingpendinglist/:page/:limit'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAllPendingBookingForAdmin", null);
__decorate([
    (0, common_1.Get)('/admincarbookingacceptedlist/:page/:limit'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAllAcceptedBookingForAdmin", null);
__decorate([
    (0, common_1.Get)('/admincarbookingassignedlist/:page/:limit'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAllAssignedBookingForAdmin", null);
__decorate([
    (0, common_1.Get)('/carbookingassignedlistfordriver/:page/:limit'),
    (0, roles_decorator_1.Roles)('Driver'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('page')),
    __param(3, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAllAssignedBookingForDriver", null);
__decorate([
    (0, common_1.Get)('/admincarbookingcompletelist/:page/:limit'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAllCompleteBookingForAdmin", null);
__decorate([
    (0, common_1.Get)('/carbookingcompletelistfordriver/:page/:limit'),
    (0, roles_decorator_1.Roles)('Driver'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('page')),
    __param(3, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAllCompleteBookingForDriver", null);
__decorate([
    (0, common_1.Get)('/admincarbookingcanceledlist/:page/:limit'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAllCanceledBookingForAdmin", null);
__decorate([
    (0, common_1.Get)('/carbookingcnceledlistfordriver/:page/:limit'),
    (0, roles_decorator_1.Roles)('Driver'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('page')),
    __param(3, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAllCanceledBookingForDriver", null);
__decorate([
    (0, common_1.Get)('/admincarbookingdetails/:id'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "adminfindOne", null);
__decorate([
    (0, common_1.Get)('/carbookingdetails/:id'),
    (0, roles_decorator_1.Roles)('Customer'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/carbookingdetailsfordriver/:id'),
    (0, roles_decorator_1.Roles)('Driver'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "findAssignOneforDriver", null);
__decorate([
    (0, common_1.Put)('update-status/:id'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin', 'Driver'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)('assign-driver/:id'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('driverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "assignDriver", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, roles_decorator_1.Roles)('Customer', 'Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, car_booking_dto_1.UpdateCarBookingDto]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Customer', 'Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('update-payment/:id'),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('paymentStatus')),
    __param(3, (0, common_1.Body)('paymentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CarBookingController.prototype, "updatePaymentStatus", null);
exports.CarBookingController = CarBookingController = __decorate([
    (0, common_1.Controller)('car-bookings'),
    __metadata("design:paramtypes", [car_booking_service_1.CarBookingService])
], CarBookingController);
//# sourceMappingURL=car_booking.controller.js.map