import { DataSource, Repository } from 'typeorm';
import { User } from '../../_entities/user.entity';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByEmail(email: string): Promise<User | undefined>;
    findById(userId: number): Promise<User | undefined>;
    createUser(name: string, role: string, email: string, image: string, phone: string, password: string): Promise<User>;
    OauthCreateUser(name: string, role: string, email: string, password: string, access_token: string, provider: string, providerId: string): Promise<User>;
    updateUser(user: User): Promise<User>;
}
