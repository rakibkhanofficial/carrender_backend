import { UserService } from './user.service';
import { User } from '../../_entities/user.entity';
interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T | null;
}
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllDriverList(): Promise<ApiResponse<User[]>>;
    getAllCustomerList(): Promise<ApiResponse<User[]>>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserById(id: number): Promise<ApiResponse<Partial<User>>>;
    updateUser(id: number, updateData: {
        name: string;
        phone: string | null;
        email: string;
        image: string | null;
        birthdaydate: Date | null;
        homeaddress: string | null;
        officeadress: string | null;
        createdAt: string;
        updatedAt: string;
    }): Promise<ApiResponse<Partial<User>>>;
}
export {};
