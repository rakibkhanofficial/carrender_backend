import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        statusCode: number;
        message: string;
        user: {
            userId: number;
            name: string;
            role: string;
            email: string;
            phone: string;
            image: string;
            accessToken: string;
            access_tokenExpiresIn: string;
            refreshToken: string;
            refresh_tokenExpiresIn: string;
        };
    }>;
    register(body: {
        name: string;
        role: string;
        email: string;
        image: string;
        phone: string;
        password: string;
    }): Promise<{
        statusCode: number;
        message: string;
        user: {
            name: string;
            role: string;
            email: string;
        };
    }>;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<{
        statusCode: number;
        message: string;
        data: {
            accessToken: string;
            refreshToken: string;
            access_tokenExpiresIn: string;
            refresh_tokenExpiresIn: string;
        };
    }>;
    logout(req: any): Promise<{
        statusCode: number;
        message: string;
    }>;
    adminOnly(): {
        message: string;
    };
    protected(req: any): {
        message: string;
        user: any;
    };
}
