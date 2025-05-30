import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CarBookingService } from './car_booking.service';
import { CreateCarBookingDto, UpdateCarBookingDto } from './car_booking.dto';
interface RequestWithUser extends Request {
    user?: {
        userId: number;
    };
}
export declare class CarBookingController {
    private readonly carBookingService;
    constructor(carBookingService: CarBookingService);
    create(createCarBookingDto: CreateCarBookingDto, req: any): Promise<{
        statusCode: number;
        message: string;
        data: import("../../_entities/car_booking.entity").CarBooking;
    }>;
    findAll(request: RequestWithUser, response: Response, page: number, limit: number): Promise<Response<any, Record<string, any>> | {
        statusCode: number;
        error: string;
    }>;
    findAllBookingForAdmin(response: Response, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findAllPendingBookingForAdmin(response: Response, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findAllAcceptedBookingForAdmin(response: Response, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findAllAssignedBookingForAdmin(response: Response, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findAllAssignedBookingForDriver(response: Response, request: RequestWithUser, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findAllCompleteBookingForAdmin(response: Response, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findAllCompleteBookingForDriver(response: Response, request: RequestWithUser, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findAllCanceledBookingForAdmin(response: Response, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    findAllCanceledBookingForDriver(response: Response, request: RequestWithUser, page: number, limit: number): Promise<Response<any, Record<string, any>>>;
    adminfindOne(response: Response, id: string): Promise<Response<any, Record<string, any>>>;
    findOne(request: RequestWithUser, response: Response, id: string): Promise<Response<any, Record<string, any>>>;
    findAssignOneforDriver(request: RequestWithUser, response: Response, id: string): Promise<Response<any, Record<string, any>>>;
    updateStatus(id: string, status: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../_entities/car_booking.entity").CarBooking;
    }>;
    assignDriver(id: string, driverId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../_entities/car_booking.entity").CarBooking;
    }>;
    update(request: RequestWithUser, response: Response, id: string, updateCarBookingDto: UpdateCarBookingDto): Promise<Response<any, Record<string, any>>>;
    remove(request: RequestWithUser, response: Response, id: string): Promise<Response<any, Record<string, any>>>;
    updatePaymentStatus(response: Response, id: string, paymentStatus: string, paymentId: string): Promise<Response<any, Record<string, any>>>;
}
export {};
