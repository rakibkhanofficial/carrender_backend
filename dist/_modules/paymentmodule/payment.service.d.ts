import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { CarBooking } from '../../_entities/car_booking.entity';
import { Car } from '../../_entities/car.entity';
import { CreateCarBookingDto } from '../carbookingModule/car_booking.dto';
import { UserService } from '../user/user.service';
export declare class PaymentService {
    private configService;
    private readonly carBookingRepository;
    private readonly carRepository;
    private readonly userService;
    private stripe;
    constructor(configService: ConfigService, carBookingRepository: Repository<CarBooking>, carRepository: Repository<Car>, userService: UserService);
    createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent>;
    createBookingAfterPayment(createCarBookingDto: CreateCarBookingDto, userId: number): Promise<CarBooking>;
    confirmPayment(bookingId: number, paymentIntentId: string): Promise<CarBooking>;
}
