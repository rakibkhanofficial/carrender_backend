import { HttpStatus } from '@nestjs/common';
import { DashboardService, IBookingListType } from './dashboard.service';
interface RequestWithUser extends Request {
    user?: {
        userId: number;
        role: string;
    };
}
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getAdminDashboard(request: RequestWithUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./dashboard.service").AdminDashboardData;
    }>;
    getUserDashboard(request: RequestWithUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./dashboard.service").UserDashboardData;
    }>;
    getDriverDashboard(request: RequestWithUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./dashboard.service").UserDashboardData;
    }>;
    getAdminBookingListType(request: RequestWithUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: IBookingListType;
    }>;
    getUserBookingListType(request: RequestWithUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: IBookingListType;
    }>;
    getDriverBookingListType(request: RequestWithUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: IBookingListType;
    }>;
}
export {};
