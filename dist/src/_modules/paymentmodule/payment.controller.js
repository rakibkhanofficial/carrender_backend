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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const token_validation_guard_1 = require("../../guards/token-validation.guard");
const roles_guard_1 = require("../auth/jwt/roles.guard");
const roles_decorator_1 = require("../auth/jwt/roles.decorator");
const car_booking_dto_1 = require("../carbookingModule/car_booking.dto");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createPaymentIntent({ amount }, req) {
        try {
            const paymentIntent = await this.paymentService.createPaymentIntent(amount, 'usd');
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Payment intent created successfully',
                data: { clientSecret: paymentIntent.client_secret },
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while creating the payment intent',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createBookingAfterPayment(createCarBookingDto, req) {
        try {
            const booking = await this.paymentService.createBookingAfterPayment(createCarBookingDto, req.user.userId);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Booking created successfully after payment',
                data: booking,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while creating the booking',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async confirmPayment(body) {
        try {
            if (!body.bookingId || !body.paymentIntentId) {
                throw new common_1.HttpException('Missing required fields: bookingId or paymentIntentId', common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.paymentService.confirmPayment(body.bookingId, body.paymentIntentId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Payment confirmed and booking updated',
                data: result,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while confirming the payment',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('create-payment-intent'),
    (0, roles_decorator_1.Roles)('Customer', 'Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPaymentIntent", null);
__decorate([
    (0, common_1.Post)('create-booking-after-payment'),
    (0, roles_decorator_1.Roles)('Customer', 'Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_booking_dto_1.CreateCarBookingDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createBookingAfterPayment", null);
__decorate([
    (0, common_1.Post)('confirm-payment'),
    (0, roles_decorator_1.Roles)('Customer', 'Admin', 'SuperAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "confirmPayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payments'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map