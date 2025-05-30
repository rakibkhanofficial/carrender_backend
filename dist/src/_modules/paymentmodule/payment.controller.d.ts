import { HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCarBookingDto } from '../carbookingModule/car_booking.dto';
interface RequestWithUser extends Request {
    user?: {
        userId: number;
    };
}
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPaymentIntent({ amount }: {
        amount: number;
    }, req: RequestWithUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            clientSecret: string;
        };
    }>;
    createBookingAfterPayment(createCarBookingDto: CreateCarBookingDto, req: RequestWithUser): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../_entities/car_booking.entity").CarBooking;
    }>;
    confirmPayment(body: {
        bookingId: number;
        paymentIntentId: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../../_entities/car_booking.entity").CarBooking;
    }>;
}
export {};
