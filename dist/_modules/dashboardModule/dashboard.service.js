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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const car_booking_entity_1 = require("../../_entities/car_booking.entity");
let DashboardService = class DashboardService {
    constructor(carBookingRepository) {
        this.carBookingRepository = carBookingRepository;
    }
    async getAdminDashboardData() {
        const totalBookings = await this.carBookingRepository.count();
        const totalRevenueResult = await this.carBookingRepository
            .createQueryBuilder('booking')
            .select('SUM(booking.totalBookingPrice)', 'total')
            .where('booking.rideStatus = :rideStatus', { rideStatus: 'Completed' })
            .getRawOne();
        const totalRevenue = totalRevenueResult
            ? parseFloat(totalRevenueResult.total) || 0
            : 0;
        const monthlyBookingData = await this.carBookingRepository
            .createQueryBuilder('booking')
            .select("DATE_FORMAT(booking.createdAt, '%b')", 'month')
            .addSelect('COUNT(*)', 'count')
            .groupBy('month')
            .orderBy('month', 'ASC')
            .getRawMany();
        const tripTypeData = await this.carBookingRepository
            .createQueryBuilder('booking')
            .select('booking.tripType', 'type')
            .addSelect('COUNT(*)', 'count')
            .groupBy('booking.tripType')
            .getRawMany();
        const pieDonutData = {
            labels: tripTypeData.map((item) => item.type),
            values: tripTypeData.map((item) => parseInt(item.count)),
        };
        return {
            totalBookings,
            totalRevenue,
            monthlyBookingData: monthlyBookingData.map((item) => ({
                x: item.month,
                y: parseInt(item.count),
            })),
            pieDonutData,
        };
    }
    async getUserDashboardData(userId) {
        const totalBookings = await this.carBookingRepository.count({
            where: { userId: userId },
        });
        const totalSpentResult = await this.carBookingRepository
            .createQueryBuilder('booking')
            .select('SUM(booking.totalBookingPrice)', 'total')
            .where('booking.userId = :userId', { userId })
            .andWhere('booking.rideStatus = :rideStatus', { rideStatus: 'Completed' })
            .getRawOne();
        const totalSpent = totalSpentResult
            ? parseFloat(totalSpentResult.total) || 0
            : 0;
        const userBookingData = await this.carBookingRepository
            .createQueryBuilder('booking')
            .select("DATE_FORMAT(booking.createdAt, '%b')", 'month')
            .addSelect('COUNT(*)', 'count')
            .where('booking.userId = :userId', { userId })
            .groupBy('month')
            .orderBy('month', 'ASC')
            .getRawMany();
        const tripTypeData = await this.carBookingRepository
            .createQueryBuilder('booking')
            .select('booking.tripType', 'type')
            .addSelect('COUNT(*)', 'count')
            .where('booking.userId = :userId', { userId })
            .groupBy('booking.tripType')
            .getRawMany();
        const pieDonutData = {
            labels: tripTypeData.map((item) => item.type),
            values: tripTypeData.map((item) => parseInt(item.count)),
        };
        return {
            totalBookings,
            totalSpent,
            userBookingData: userBookingData.map((item) => ({
                x: item.month,
                y: parseInt(item.count),
            })),
            pieDonutData,
        };
    }
    async getDriverDashboardData(driverId) {
        const totalBookings = await this.carBookingRepository.count({
            where: { driverId: driverId },
        });
        const totalEarnResult = await this.carBookingRepository
            .createQueryBuilder('booking')
            .select('SUM(booking.totalBookingPrice)', 'total')
            .where('booking.driverId = :driverId', { driverId })
            .andWhere('booking.rideStatus = :rideStatus', { rideStatus: 'Completed' })
            .getRawOne();
        const totalEarn = totalEarnResult
            ? parseFloat(totalEarnResult.total) || 0
            : 0;
        const userBookingData = await this.carBookingRepository
            .createQueryBuilder('booking')
            .select("DATE_FORMAT(booking.createdAt, '%b')", 'month')
            .addSelect('COUNT(*)', 'count')
            .where('booking.driverId = :driverId', { driverId })
            .groupBy('month')
            .orderBy('month', 'ASC')
            .getRawMany();
        const tripTypeData = await this.carBookingRepository
            .createQueryBuilder('booking')
            .select('booking.tripType', 'type')
            .addSelect('COUNT(*)', 'count')
            .where('booking.driverId = :driverId', { driverId })
            .groupBy('booking.tripType')
            .getRawMany();
        const pieDonutData = {
            labels: tripTypeData.map((item) => item.type),
            values: tripTypeData.map((item) => parseInt(item.count)),
        };
        return {
            totalBookings,
            totalEarn,
            userBookingData: userBookingData.map((item) => ({
                x: item.month,
                y: parseInt(item.count),
            })),
            pieDonutData,
        };
    }
    async getAdminBookingListType() {
        return this.getBookingListType();
    }
    async getUserBookingListType(userId) {
        return this.getBookingListType(userId);
    }
    async getBookingListType(userId) {
        const baseQuery = this.carBookingRepository.createQueryBuilder('booking');
        if (userId) {
            baseQuery.where('booking.userId = :userId', { userId });
        }
        const bookingCounts = await baseQuery
            .select('booking.rideStatus', 'status')
            .addSelect('COUNT(*)', 'count')
            .groupBy('booking.rideStatus')
            .getRawMany();
        const countMap = bookingCounts.reduce((acc, { status, count }) => {
            acc[status] = parseInt(count);
            return acc;
        }, {});
        return {
            totalPendingBookingdata: countMap['Pending'] || 0,
            totalAcceptedBookingdata: countMap['Accepted'] || 0,
            totalAssignedBookingdata: countMap['Assigned'] || 0,
            totalCompleteBookingdata: countMap['Completed'] || 0,
            totalCanceledBookingdata: countMap['Canceled'] || 0,
        };
    }
    async getDriverBookingListType(driverId) {
        return this.getBookingListTypedriver(driverId);
    }
    async getBookingListTypedriver(driverId) {
        const baseQuery = this.carBookingRepository.createQueryBuilder('booking');
        if (driverId) {
            baseQuery.where('booking.driverId = :driverId', { driverId });
        }
        const bookingCounts = await baseQuery
            .select('booking.rideStatus', 'status')
            .addSelect('COUNT(*)', 'count')
            .groupBy('booking.rideStatus')
            .getRawMany();
        const countMap = bookingCounts.reduce((acc, { status, count }) => {
            acc[status] = parseInt(count);
            return acc;
        }, {});
        return {
            totalPendingBookingdata: countMap['Pending'] || 0,
            totalAcceptedBookingdata: countMap['Accepted'] || 0,
            totalAssignedBookingdata: countMap['Assigned'] || 0,
            totalCompleteBookingdata: countMap['Completed'] || 0,
            totalCanceledBookingdata: countMap['Canceled'] || 0,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_booking_entity_1.CarBooking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DashboardService);
