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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stripe_1 = require("stripe");
const car_booking_entity_1 = require("../../_entities/car_booking.entity");
const car_entity_1 = require("../../_entities/car.entity");
const user_service_1 = require("../user/user.service");
let PaymentService = class PaymentService {
    constructor(configService, carBookingRepository, carRepository, userService) {
        this.configService = configService;
        this.carBookingRepository = carBookingRepository;
        this.carRepository = carRepository;
        this.userService = userService;
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) {
            console.error('STRIPE_SECRET_KEY is not set in the environment');
            throw new common_1.InternalServerErrorException('Stripe configuration error');
        }
        this.stripe = new stripe_1.default(stripeSecretKey, {
            apiVersion: '2024-06-20',
        });
    }
    async createPaymentIntent(amount, currency) {
        return this.stripe.paymentIntents.create({
            amount,
            currency,
        });
    }
    async createBookingAfterPayment(createCarBookingDto, userId) {
        try {
            const car = await this.carRepository.findOne({
                where: { id: createCarBookingDto.carId },
            });
            if (!car) {
                throw new common_1.NotFoundException('Car not found');
            }
            const user = await this.userService.findUserById(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const booking = this.carBookingRepository.create({
                ...createCarBookingDto,
                userId,
                carModel: car.model,
                carName: car.name,
                carImage: car.image,
                renterName: user.name,
                renterPhone: user.phone,
                rideStatus: 'Pending',
                paymentMethod: 'online',
                paymentStatus: 'Paid',
            });
            return await this.carBookingRepository.save(booking);
        }
        catch (error) {
            console.error('Error in createBookingAfterPayment:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('An error occurred while creating the booking');
            }
        }
    }
    async confirmPayment(bookingId, paymentIntentId) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
            if (paymentIntent.status === 'succeeded') {
                const booking = await this.carBookingRepository.findOne({
                    where: { id: bookingId },
                });
                if (!booking) {
                    throw new common_1.NotFoundException('Booking not found');
                }
                booking.paymentStatus = 'Paid';
                booking.stripePaymentIntentId = paymentIntentId;
                return this.carBookingRepository.save(booking);
            }
            else {
                throw new Error('Payment not successful');
            }
        }
        catch (error) {
            console.error('Error in confirmPayment:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('An error occurred while confirming the payment');
            }
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(car_booking_entity_1.CarBooking)),
    __param(2, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService])
], PaymentService);
