import { ConfigService } from '@nestjs/config';
import { User } from '../../../_entities/user.entity';
interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): Promise<Partial<User>>;
}
export {};
