import { UserRepository } from './user.repository';
import { User } from '../../_entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findByEmail(email: string): Promise<User | undefined>;
    findUserById(id: number): Promise<User | undefined>;
    updateUserDetails(id: number, updateData: {
        name: string;
        phone: string | null;
        email: string;
        image: string | null;
        birthdaydate: Date | null;
        homeaddress: string | null;
        officeadress: string | null;
        createdAt: string;
        updatedAt: string;
    }): Promise<User>;
    createUser(name: string, role: string, email: string, image: string, phone: string, password: string): Promise<User>;
    OauthcreateUser(name: string, role: string, email: string, password: string, access_token: string, provider: string, providerId: string): Promise<User>;
    updateUser(user: User): Promise<User>;
}
