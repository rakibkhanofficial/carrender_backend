// payment.controller.ts
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TokenValidationGuard } from '../../guards/token-validation.guard';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Roles } from '../auth/jwt/roles.decorator';
import { CreateCarBookingDto } from '../carbookingModule/car_booking.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('process-online-payment')
  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('Customer', 'Admin', 'SuperAdmin')
  async processOnlinePayment(
    @Body() createCarBookingDto: CreateCarBookingDto,
    @Req() req,
  ) {
    const result =
      await this.paymentService.processOnlinePaymentAndCreateBooking(
        createCarBookingDto,
        req.user.userId,
      );
    return {
      statusCode: 200,
      message: 'Payment intent created and booking initiated',
      data: result,
    };
  }

  @Post('confirm-payment')
  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('Customer', 'Admin', 'SuperAdmin')
  async confirmPayment(
    @Body() body: { bookingId: number; paymentIntentId: string },
  ) {
    const result = await this.paymentService.confirmPayment(
      body.bookingId,
      body.paymentIntentId,
    );
    return {
      statusCode: 200,
      message: 'Payment confirmed and booking updated',
      data: result,
    };
  }
}
