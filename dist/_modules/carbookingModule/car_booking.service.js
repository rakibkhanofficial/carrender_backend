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
exports.CarBookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const car_booking_entity_1 = require("../../_entities/car_booking.entity");
const user_service_1 = require("../user/user.service");
const car_service_1 = require("../carmodule/car.service");
const payment_service_1 = require("../paymentmodule/payment.service");
let CarBookingService = class CarBookingService {
    constructor(carBookingRepository, carService, userService, paymentService) {
        this.carBookingRepository = carBookingRepository;
        this.carService = carService;
        this.userService = userService;
        this.paymentService = paymentService;
    }
    async CashBookingcreate(createCarBookingDto, userId) {
        const car = await this.carService.findById(createCarBookingDto.carId);
        if (!car) {
            throw new common_1.NotFoundException('Car not found');
        }
        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const carBooking = this.carBookingRepository.create({
            ...createCarBookingDto,
            userId,
            carModel: car.model,
            carName: car.name,
            carImage: car.image,
            renterName: user.name,
            renterPhone: user.phone,
            rideStatus: 'Pending',
            paymentStatus: 'Unpaid',
            paymentMethod: 'cash',
        });
        return this.carBookingRepository.save(carBooking);
    }
    async findAll(userId, page = 1, limit = 10) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            where: { userId },
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async findAllBookingforadmin(page = 1, limit = 10) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async findAllPendingBookingforadmin(page = 1, limit = 10) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            where: { rideStatus: 'Pending' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async findAllAcceptedBookingforadmin(page = 1, limit = 10) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            where: { rideStatus: 'Accepted' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async findAllAssignedBookingforadmin(page = 1, limit = 10) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            where: { rideStatus: 'Assigned' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async findAllAssignedBookingfordriver(page = 1, limit = 10, driverId) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            where: { driverId, rideStatus: 'Assigned' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async findAllCompletedBookingforadmin(page = 1, limit = 10) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            where: { rideStatus: 'Completed' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async findAllCompletedBookingfordriver(page = 1, limit = 10, driverId) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            where: { driverId, rideStatus: 'Completed' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async findAllCancelBookingforadmin(page = 1, limit = 10) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            where: { rideStatus: 'Canceled' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async findAllCanceledBookingfordriver(page = 1, limit = 10, driverId) {
        const [bookings, total] = await this.carBookingRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            where: { driverId, rideStatus: 'Canceled' },
            select: [
                'id',
                'tripType',
                'totalBookingPrice',
                'rideStatus',
                'paymentMethod',
                'paymentStatus',
                'carImage',
                'pickupDate',
                'pickupTime',
                'pickupLocationAddress',
                'pickupLocationMapLink',
                'dropoffLocationAddress',
                'dropoffLocationMapLink',
                'hour',
                'distance',
                'createdAt',
                'updatedAt',
            ],
        });
        return {
            data: bookings,
            total,
            page,
            limit,
        };
    }
    async adminfindOne(id) {
        const carBooking = await this.carBookingRepository.findOne({
            where: { id },
            relations: ['car', 'user', 'driver'],
            select: {
                id: true,
                driverId: true,
                tripType: true,
                totalBookingPrice: true,
                rideStatus: true,
                paymentMethod: true,
                paymentStatus: true,
                carImage: true,
                pickupDate: true,
                pickupTime: true,
                pickupLocationAddress: true,
                pickupLocationMapLink: true,
                dropoffLocationAddress: true,
                dropoffLocationMapLink: true,
                airportName: true,
                hour: true,
                distance: true,
                createdAt: true,
                updatedAt: true,
                car: {
                    name: true,
                    model: true,
                    make: true,
                    year: true,
                    seatingCapacity: true,
                    fuelType: true,
                },
                user: {
                    userId: true,
                    name: true,
                    email: true,
                    phone: true,
                },
                driver: {
                    userId: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
        });
        if (!carBooking) {
            throw new common_1.NotFoundException('Car booking not found');
        }
        return carBooking;
    }
    async findAssignOneBydriverId(id, driverId) {
        const carBooking = await this.carBookingRepository.findOne({
            where: { id, driverId, rideStatus: 'Assigned' },
            relations: ['car', 'user', 'driver'],
            select: {
                id: true,
                driverId: true,
                tripType: true,
                totalBookingPrice: true,
                rideStatus: true,
                paymentMethod: true,
                paymentStatus: true,
                carImage: true,
                pickupDate: true,
                pickupTime: true,
                pickupLocationAddress: true,
                pickupLocationMapLink: true,
                dropoffLocationAddress: true,
                dropoffLocationMapLink: true,
                airportName: true,
                hour: true,
                distance: true,
                createdAt: true,
                updatedAt: true,
                car: {
                    name: true,
                    model: true,
                    make: true,
                    year: true,
                    seatingCapacity: true,
                    fuelType: true,
                },
                user: {
                    userId: true,
                    name: true,
                    email: true,
                    phone: true,
                },
                driver: {
                    userId: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
        });
        if (!carBooking) {
            throw new common_1.NotFoundException('Car booking not found');
        }
        return carBooking;
    }
    async findOne(id, userId) {
        const carBooking = await this.carBookingRepository.findOne({
            where: { id, userId },
            relations: ['car', 'user', 'driver'],
        });
        if (!carBooking) {
            throw new common_1.NotFoundException('Car booking not found');
        }
        return carBooking;
    }
    async update(id, updateCarBookingDto, userId) {
        const carBooking = await this.findOne(id, userId);
        if (updateCarBookingDto.carId &&
            updateCarBookingDto.carId !== carBooking.carId) {
            const newCar = await this.carService.findById(updateCarBookingDto.carId);
            if (!newCar) {
                throw new common_1.NotFoundException('New car not found');
            }
            carBooking.carModel = newCar.model;
            carBooking.carName = newCar.name;
            carBooking.totalBookingPrice = updateCarBookingDto.totalBookingPrice;
        }
        Object.assign(carBooking, updateCarBookingDto);
        return this.carBookingRepository.save(carBooking);
    }
    async findOneById(id) {
        const carBooking = await this.carBookingRepository.findOne({
            where: { id },
        });
        if (!carBooking) {
            throw new common_1.NotFoundException(`Car booking with ID ${id} not found`);
        }
        return carBooking;
    }
    async updateStatus(id, status) {
        const booking = await this.findOneById(id);
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        booking.rideStatus = status;
        return this.carBookingRepository.save(booking);
    }
    async assigndriver(id, driverId) {
        const booking = await this.findOneById(id);
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        booking.driverId = driverId;
        return this.carBookingRepository.save(booking);
    }
    async remove(id, userId) {
        const carBooking = await this.findOne(id, userId);
        await this.carBookingRepository.remove(carBooking);
    }
    async updatePaymentStatus(id, paymentStatus, paymentId) {
        const carBooking = await this.carBookingRepository.findOne({
            where: { id },
        });
        if (!carBooking) {
            throw new common_1.NotFoundException('Car booking not found');
        }
        carBooking.paymentStatus = paymentStatus;
        carBooking.paymentId = paymentId;
        return this.carBookingRepository.save(carBooking);
    }
};
exports.CarBookingService = CarBookingService;
exports.CarBookingService = CarBookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_booking_entity_1.CarBooking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        car_service_1.CarService,
        user_service_1.UserService,
        payment_service_1.PaymentService])
], CarBookingService);
