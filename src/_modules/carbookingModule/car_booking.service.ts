import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarBooking } from '../../_entities/car_booking.entity';
import { CreateCarBookingDto, UpdateCarBookingDto } from './car_booking.dto';
import { UserService } from '../user/user.service';
import { CarService } from '../carmodule/car.service';
import { PaymentService } from '../paymentmodule/payment.service';

@Injectable()
export class CarBookingService {
  constructor(
    @InjectRepository(CarBooking)
    private readonly carBookingRepository: Repository<CarBooking>,
    private readonly carService: CarService,
    private readonly userService: UserService,
    private readonly paymentService: PaymentService,
  ) {}
  async CashBookingcreate(
    createCarBookingDto: CreateCarBookingDto,
    userId: number,
  ): Promise<CarBooking> {
    const car = await this.carService.findById(createCarBookingDto.carId);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const carBooking = this.carBookingRepository.create({
      ...createCarBookingDto,
      userId,
      carModel: car.model,
      carName: car.name,
      carImage: car.image,
      renterName: user.name,
      renterPhone: user.phone,
      rideStatus: 'Pending',
      paymentStatus: 'Unpaid',
      paymentMethod: 'cash',
    });

    return this.carBookingRepository.save(carBooking);
  }

  async findAll(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Partial<CarBooking>[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [bookings, total] = await this.carBookingRepository.findAndCount({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      select: [
        'id',
        'tripType',
        'totalBookingPrice',
        'rideStatus',
        'paymentMethod',
        'paymentStatus',
        'carImage',
        'pickupDate',
        'pickupTime',
        'pickupLocationAddress',
        'pickupLocationMapLink',
        'dropoffLocationAddress',
        'dropoffLocationMapLink',
        'hour',
        'distance',
        'createdAt',
        'updatedAt',
      ],
    });
    return {
      data: bookings,
      total,
      page,
      limit,
    };
  }

  async findAllBookingforadmin(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Partial<CarBooking>[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [bookings, total] = await this.carBookingRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      select: [
        'id',
        'tripType',
        'totalBookingPrice',
        'rideStatus',
        'paymentMethod',
        'paymentStatus',
        'carImage',
        'pickupDate',
        'pickupTime',
        'pickupLocationAddress',
        'pickupLocationMapLink',
        'dropoffLocationAddress',
        'dropoffLocationMapLink',
        'hour',
        'distance',
        'createdAt',
        'updatedAt',
      ],
    });
    return {
      data: bookings,
      total,
      page,
      limit,
    };
  }

  async adminfindOne(id: number): Promise<CarBooking> {
    const carBooking = await this.carBookingRepository.findOne({
      where: { id },
      relations: ['car', 'user'],
      select: {
        id: true,
        tripType: true,
        totalBookingPrice: true,
        rideStatus: true,
        paymentMethod: true,
        paymentStatus: true,
        carImage: true,
        pickupDate: true,
        pickupTime: true,
        pickupLocationAddress: true,
        pickupLocationMapLink: true,
        dropoffLocationAddress: true,
        dropoffLocationMapLink: true,
        airportName: true,
        hour: true,
        distance: true,
        createdAt: true,
        updatedAt: true,
        car: {
          name: true,
          model: true,
          make: true,
          year: true,
          seatingCapacity: true,
          fuelType: true,
        },
        user: {
          name: true,
          email: true,
          phone: true,
        },
      },
    });

    if (!carBooking) {
      throw new NotFoundException('Car booking not found');
    }

    return carBooking;
  }

  async findOne(id: number, userId: number): Promise<CarBooking> {
    const carBooking = await this.carBookingRepository.findOne({
      where: { id, userId },
      relations: ['car', 'user'],
    });

    if (!carBooking) {
      throw new NotFoundException('Car booking not found');
    }

    return carBooking;
  }

  async update(
    id: number,
    updateCarBookingDto: UpdateCarBookingDto,
    userId: number,
  ): Promise<CarBooking> {
    const carBooking = await this.findOne(id, userId);

    if (
      updateCarBookingDto.carId &&
      updateCarBookingDto.carId !== carBooking.carId
    ) {
      const newCar = await this.carService.findById(updateCarBookingDto.carId);
      if (!newCar) {
        throw new NotFoundException('New car not found');
      }
      carBooking.carModel = newCar.model;
      carBooking.carName = newCar.name;
      carBooking.totalBookingPrice = updateCarBookingDto.totalBookingPrice;
    }

    Object.assign(carBooking, updateCarBookingDto);

    return this.carBookingRepository.save(carBooking);
  }

  async findOneById(id: number): Promise<CarBooking> {
    const carBooking = await this.carBookingRepository.findOne({
      where: { id },
    });

    if (!carBooking) {
      throw new NotFoundException(`Car booking with ID ${id} not found`);
    }

    return carBooking;
  }
  async updateStatus(id: number, status: string) {
    const booking = await this.findOneById(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    booking.rideStatus = status;
    return this.carBookingRepository.save(booking);
  }

  async remove(id: number, userId: number): Promise<void> {
    const carBooking = await this.findOne(id, userId);
    await this.carBookingRepository.remove(carBooking);
  }

  async updatePaymentStatus(
    id: number,
    paymentStatus: string,
    paymentId: string,
  ): Promise<CarBooking> {
    const carBooking = await this.carBookingRepository.findOne({
      where: { id },
    });

    if (!carBooking) {
      throw new NotFoundException('Car booking not found');
    }

    carBooking.paymentStatus = paymentStatus;
    carBooking.paymentId = paymentId;

    return this.carBookingRepository.save(carBooking);
  }
}
