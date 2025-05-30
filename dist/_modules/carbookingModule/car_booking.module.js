"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarBookingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const car_booking_controller_1 = require("./car_booking.controller");
const car_booking_service_1 = require("./car_booking.service");
const car_booking_entity_1 = require("../../_entities/car_booking.entity");
const user_module_1 = require("../user/user.module");
const car_module_1 = require("../carmodule/car.module");
const auth_module_1 = require("../auth/auth.module");
const payment_module_1 = require("../paymentmodule/payment.module");
let CarBookingModule = class CarBookingModule {
};
exports.CarBookingModule = CarBookingModule;
exports.CarBookingModule = CarBookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([car_booking_entity_1.CarBooking]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            car_module_1.CarModule,
            user_module_1.UserModule,
            payment_module_1.PaymentModule,
        ],
        controllers: [car_booking_controller_1.CarBookingController],
        providers: [car_booking_service_1.CarBookingService],
        exports: [car_booking_service_1.CarBookingService],
    })
], CarBookingModule);
