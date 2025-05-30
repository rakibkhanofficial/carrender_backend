export declare class CreateCarBookingDto {
    carId: number;
    tripType: string;
    airportName?: string;
    flightNo?: string;
    childSeat?: boolean;
    luggage: number;
    passenger: number;
    mobileNumber: string;
    rideStatus: string;
    pickupLocationAddress: string;
    totalBookingPrice: number;
    pickupLocationMapLink?: string;
    pickupDate: Date;
    pickupTime: string;
    dropoffLocationAddress: string;
    dropoffLocationMapLink?: string;
    hour?: number;
    distance?: number;
    paymentMethod: string;
    paymentStatus?: string;
    stripePaymentIntentId?: string;
}
export declare class UpdateCarBookingDto extends CreateCarBookingDto {
    paymentStatus?: string;
    paymentMethod: string;
    paymentId?: string;
    stripePaymentIntentId?: string;
}
