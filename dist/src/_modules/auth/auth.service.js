"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../../_entities/user.entity");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.userId, role: user.role };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        const access_tokenExpiresIn = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        const refresh_tokenExpiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        user.access_token = accessToken;
        user.refresh_token = refreshToken;
        user.access_tokenExpiresIn = access_tokenExpiresIn;
        user.refresh_tokenExpiresIn = refresh_tokenExpiresIn;
        await this.userRepository.save(user);
        return {
            accessToken,
            refreshToken,
            access_tokenExpiresIn,
            refresh_tokenExpiresIn,
        };
    }
    async register(name, role, email, image, phone, password) {
        if (![
            'Customer',
            'Admin',
            'SuperAdmin',
            'Driver',
            'CustomerService',
        ].includes(role)) {
            throw new common_1.BadRequestException('Invalid role');
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await this.userService.createUser(name, role, email, image, phone, hashedPassword);
        const { password: _, ...result } = user;
        return result;
    }
    async refreshToken(refreshToken) {
        try {
            const decode = this.jwtService.decode(refreshToken);
            const user = await this.userService.findByEmail(decode.email);
            if (!user) {
                throw new common_1.UnauthorizedException('user not found');
            }
            const response = await this.login(user);
            return response;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async validateToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userRepository.findOne({
                where: { userId: payload.sub },
            });
            if (!user) {
                return { isValid: false };
            }
            return { isValid: true, user };
        }
        catch (error) {
            return { isValid: false };
        }
    }
    async logout(userId) {
        const user = await this.userRepository.findOne({
            where: { userId: userId },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        user.access_token = null;
        user.refresh_token = null;
        user.access_tokenExpiresIn = null;
        user.refresh_tokenExpiresIn = null;
        await this.userRepository.save(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        typeorm_1.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map