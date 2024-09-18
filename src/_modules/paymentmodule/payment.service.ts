import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { CarBooking } from '../../_entities/car_booking.entity';
import { Car } from '../../_entities/car.entity';
import { CreateCarBookingDto } from '../carbookingModule/car_booking.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    @InjectRepository(CarBooking)
    private readonly carBookingRepository: Repository<CarBooking>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>(process.env.STRIPE_SECRET_KEY) || '',
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }

  async processOnlinePaymentAndCreateBooking(
    createCarBookingDto: CreateCarBookingDto,
    userId: number,
  ): Promise<{ booking: CarBooking; clientSecret: string }> {
    try {
      const car = await this.carRepository.findOne({
        where: { id: createCarBookingDto.carId },
      });
      if (!car) {
        throw new NotFoundException('Car not found');
      }

      // Create a PaymentIntent
      const paymentIntent = await this.createPaymentIntent(
        Math.round(createCarBookingDto.totalBookingPrice * 100), // Stripe expects amount in cents
        'usd', // Assuming USD, adjust as needed
      );

      // Create the booking with pending status
      const booking = this.carBookingRepository.create({
        ...createCarBookingDto,
        userId,
        paymentMethod: 'online',
        paymentStatus: 'Pending',
        stripePaymentIntentId: paymentIntent.id,
      });

      const savedBooking = await this.carBookingRepository.save(booking);

      return {
        booking: savedBooking,
        clientSecret: paymentIntent.client_secret || '',
      };
    } catch (error) {
      console.error('Error in processOnlinePaymentAndCreateBooking:', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred while processing the payment and creating the booking',
        );
      }
    }
  }

  async confirmPayment(
    bookingId: number,
    paymentIntentId: string,
  ): Promise<CarBooking> {
    try {
      const paymentIntent =
        await this.stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === 'succeeded') {
        const booking = await this.carBookingRepository.findOne({
          where: { id: bookingId },
        });

        if (!booking) {
          throw new NotFoundException('Booking not found');
        }

        booking.paymentStatus = 'Paid';
        booking.stripePaymentIntentId = paymentIntentId;

        return this.carBookingRepository.save(booking);
      } else {
        throw new Error('Payment not successful');
      }
    } catch (error) {
      console.error('Error in confirmPayment:', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An error occurred while confirming the payment',
        );
      }
    }
  }
}
