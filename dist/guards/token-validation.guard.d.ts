import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../_modules/auth/auth.service';
export declare class TokenValidationGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
