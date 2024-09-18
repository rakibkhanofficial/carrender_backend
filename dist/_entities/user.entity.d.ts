import { Car } from './car.entity';
export declare class User {
    userId: number;
    name: string;
    email: string;
    phone: string;
    image: string;
    birthdaydate: Date;
    homeaddress: string;
    officeadress: string;
    password: string;
    role: string;
    cars: Car[];
    access_token: string;
    refresh_token: string;
    access_tokenExpiresIn: string;
    refresh_tokenExpiresIn: string;
    provider: string;
    providerId: string;
    createdAt: Date;
    updatedAt: Date;
}
