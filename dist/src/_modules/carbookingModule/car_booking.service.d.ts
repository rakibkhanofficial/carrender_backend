import { Repository } from 'typeorm';
import { CarBooking } from '../../_entities/car_booking.entity';
import { CreateCarBookingDto, UpdateCarBookingDto } from './car_booking.dto';
import { UserService } from '../user/user.service';
import { CarService } from '../carmodule/car.service';
import { PaymentService } from '../paymentmodule/payment.service';
export declare class CarBookingService {
    private readonly carBookingRepository;
    private readonly carService;
    private readonly userService;
    private readonly paymentService;
    constructor(carBookingRepository: Repository<CarBooking>, carService: CarService, userService: UserService, paymentService: PaymentService);
    CashBookingcreate(createCarBookingDto: CreateCarBookingDto, userId: number): Promise<CarBooking>;
    findAll(userId: number, page?: number, limit?: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllBookingforadmin(page?: number, limit?: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllPendingBookingforadmin(page?: number, limit?: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllAcceptedBookingforadmin(page?: number, limit?: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllAssignedBookingforadmin(page?: number, limit?: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllAssignedBookingfordriver(page: number, limit: number, driverId: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllCompletedBookingforadmin(page?: number, limit?: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllCompletedBookingfordriver(page: number, limit: number, driverId: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllCancelBookingforadmin(page?: number, limit?: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllCanceledBookingfordriver(page: number, limit: number, driverId: number): Promise<{
        data: Partial<CarBooking>[];
        total: number;
        page: number;
        limit: number;
    }>;
    adminfindOne(id: number): Promise<CarBooking>;
    findAssignOneBydriverId(id: number, driverId: number): Promise<CarBooking>;
    findOne(id: number, userId: number): Promise<CarBooking>;
    update(id: number, updateCarBookingDto: UpdateCarBookingDto, userId: number): Promise<CarBooking>;
    findOneById(id: number): Promise<CarBooking>;
    updateStatus(id: number, status: string): Promise<CarBooking>;
    assigndriver(id: number, driverId: number): Promise<CarBooking>;
    remove(id: number, userId: number): Promise<void>;
    updatePaymentStatus(id: number, paymentStatus: string, paymentId: string): Promise<CarBooking>;
}
