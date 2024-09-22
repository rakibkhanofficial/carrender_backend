import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  Put,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CarBookingService } from './car_booking.service';
import { CreateCarBookingDto, UpdateCarBookingDto } from './car_booking.dto';
import { TokenValidationGuard } from '../../guards/token-validation.guard';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Roles } from '../auth/jwt/roles.decorator';

interface RequestWithUser extends Request {
  user?: {
    userId: number;
  };
}

@Controller('car-bookings')
@UseGuards(TokenValidationGuard, RolesGuard)
export class CarBookingController {
  constructor(private readonly carBookingService: CarBookingService) {}

  @Post('createbookingbycash')
  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('Customer', 'Admin', 'SuperAdmin')
  async create(@Body() createCarBookingDto: CreateCarBookingDto, @Req() req) {
    if (createCarBookingDto.paymentMethod !== 'cash') {
      throw new Error(
        'This endpoint is for cash payments only. For online payments, use the payments/process-online-payment endpoint.',
      );
    }

    const booking = await this.carBookingService.create(
      createCarBookingDto,
      req.user.userId,
    );
    return {
      statusCode: 201,
      message: 'Car booking was successfully created',
      data: booking,
    };
  }

  @Get('/carBookingsbyuser/:page/:limit')
  @Roles('Customer')
  @UseGuards(TokenValidationGuard, RolesGuard)
  async findAll(
    @Req() request: RequestWithUser,
    @Res() response: Response,
    @Param('page') page: number,
    @Param('limit') limit: number,
    // @Query('page') page: number = 1,
    // @Query('limit') limit: number = 10,
  ) {
    try {
      const bookings = await this.carBookingService.findAll(
        request.user.userId,
        page,
        limit,
      );
      return response.status(200).json({
        statusCode: 200,
        message: 'Car booking list was successfully retrieved',
        data: bookings,
      });
    } catch (error) {
      return response.status(500).json({
        statusCode: 500,
        message: 'An error occurred while fetching the car booking list',
        error: error.message,
      });
    }
  }

  @Get(':id')
  @Roles('Customer', 'Admin', 'SuperAdmin')
  @UseGuards(TokenValidationGuard, RolesGuard)
  async findOne(
    @Req() request: RequestWithUser,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    try {
      const booking = await this.carBookingService.findOne(
        +id,
        request.user.userId,
      );
      return response.status(200).json({
        statusCode: 200,
        message: 'Car booking was successfully retrieved',
        data: booking,
      });
    } catch (error) {
      return response.status(500).json({
        statusCode: 500,
        message: 'An error occurred while fetching the car booking',
        error: error.message,
      });
    }
  }

  @Put('update/:id')
  @Roles('Customer', 'Admin', 'SuperAdmin')
  @UseGuards(TokenValidationGuard, RolesGuard)
  async update(
    @Req() request: RequestWithUser,
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateCarBookingDto: UpdateCarBookingDto,
  ) {
    try {
      const booking = await this.carBookingService.update(
        +id,
        updateCarBookingDto,
        request.user.userId,
      );
      return response.status(200).json({
        statusCode: 200,
        message: 'Car booking was successfully updated',
        data: booking,
      });
    } catch (error) {
      return response.status(500).json({
        statusCode: 500,
        message: 'An error occurred while updating the car booking',
        error: error.message,
      });
    }
  }

  @Delete('delete/:id')
  @UseGuards(TokenValidationGuard, RolesGuard)
  @Roles('Customer', 'Admin', 'SuperAdmin')
  async remove(
    @Req() request: RequestWithUser,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    try {
      await this.carBookingService.remove(+id, request.user.userId);
      return response.status(200).json({
        statusCode: 200,
        message: 'Car booking was successfully deleted',
      });
    } catch (error) {
      return response.status(500).json({
        statusCode: 500,
        message: 'An error occurred while deleting the car booking',
        error: error.message,
      });
    }
  }

  @Put('update-payment/:id')
  @Roles('Admin', 'SuperAdmin')
  @UseGuards(TokenValidationGuard, RolesGuard)
  async updatePaymentStatus(
    @Res() response: Response,
    @Param('id') id: string,
    @Body('paymentStatus') paymentStatus: string,
    @Body('paymentId') paymentId: string,
  ) {
    try {
      const booking = await this.carBookingService.updatePaymentStatus(
        +id,
        paymentStatus,
        paymentId,
      );
      return response.status(200).json({
        statusCode: 200,
        message: 'Car booking payment status was successfully updated',
        data: booking,
      });
    } catch (error) {
      return response.status(500).json({
        statusCode: 500,
        message:
          'An error occurred while updating the car booking payment status',
        error: error.message,
      });
    }
  }
}
