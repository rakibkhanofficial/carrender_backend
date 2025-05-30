import { Repository } from 'typeorm';
import { CarBooking } from '../../_entities/car_booking.entity';
export interface MonthlyData {
    x: string;
    y: number;
}
export interface PieDonutData {
    labels: string[];
    values: number[];
}
export interface IBookingListType {
    totalPendingBookingdata: number;
    totalAcceptedBookingdata: number;
    totalAssignedBookingdata: number;
    totalCompleteBookingdata: number;
    totalCanceledBookingdata: number;
}
export interface AdminDashboardData {
    totalBookings: number;
    totalRevenue: number;
    monthlyBookingData: MonthlyData[];
    pieDonutData: PieDonutData;
}
export interface UserDashboardData {
    totalBookings: number;
    totalSpent: number;
    userBookingData: MonthlyData[];
    pieDonutData: PieDonutData;
}
export interface DriverDashboardData {
    totalBookings: number;
    totalEarn: number;
    userBookingData: MonthlyData[];
    pieDonutData: PieDonutData;
}
export declare class DashboardService {
    private readonly carBookingRepository;
    constructor(carBookingRepository: Repository<CarBooking>);
    getAdminDashboardData(): Promise<AdminDashboardData>;
    getUserDashboardData(userId: number): Promise<UserDashboardData>;
    getDriverDashboardData(driverId: number): Promise<DriverDashboardData>;
    getAdminBookingListType(): Promise<IBookingListType>;
    getUserBookingListType(userId: number): Promise<IBookingListType>;
    private getBookingListType;
    getDriverBookingListType(driverId: number): Promise<IBookingListType>;
    private getBookingListTypedriver;
}
