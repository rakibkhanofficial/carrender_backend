import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../_entities/user.entity';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly userRepository;
    constructor(userService: UserService, jwtService: JwtService, userRepository: Repository<User>);
    validateUser(email: string, password: string): Promise<User | null>;
    login(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
        access_tokenExpiresIn: string;
        refresh_tokenExpiresIn: string;
    }>;
    register(name: string, role: string, email: string, image: string, phone: string, password: string): Promise<Omit<User, 'password'>>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        access_tokenExpiresIn: string;
        refresh_tokenExpiresIn: string;
    }>;
    validateToken(token: string): Promise<{
        isValid: boolean;
        user?: User;
    }>;
    logout(userId: number): Promise<void>;
}
