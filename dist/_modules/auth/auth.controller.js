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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./jwt/jwt-auth.guard");
const roles_guard_1 = require("./jwt/roles.guard");
const roles_decorator_1 = require("./jwt/roles.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(body) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const tokens = await this.authService.login(user);
        return {
            statusCode: 200,
            message: 'Account LoggedIn Successfully',
            user: {
                userId: user.userId,
                name: user.name,
                role: user.role,
                email: user.email,
                phone: user.phone,
                image: user.image,
                isActive: user.isActive,
                accessToken: tokens.accessToken,
                access_tokenExpiresIn: tokens.access_tokenExpiresIn,
                refreshToken: tokens.refreshToken,
                refresh_tokenExpiresIn: tokens.refresh_tokenExpiresIn,
            },
        };
    }
    async register(body) {
        try {
            const user = await this.authService.register(body.name, body.role, body.email, body.image, body.phone, body.password);
            return {
                statusCode: 200,
                message: 'Account Created Successfully',
                user: {
                    name: user.name,
                    role: user.role,
                    email: user.email,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async refreshToken(body) {
        try {
            const tokens = await this.authService.refreshToken(body.refreshToken);
            return {
                statusCode: 200,
                message: 'Tokens refreshed successfully',
                data: {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    access_tokenExpiresIn: tokens.access_tokenExpiresIn,
                    refresh_tokenExpiresIn: tokens.refresh_tokenExpiresIn,
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async logout(req) {
        try {
            await this.authService.logout(req.user.id);
            return {
                statusCode: 200,
                message: 'Logged out successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    adminOnly() {
        return { message: 'This is an admin-only route' };
    }
    protected(req) {
        return { message: 'This is a protected route', user: req.user };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'SuperAdmin'),
    (0, common_1.Get)('admin-only'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "adminOnly", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Customer', 'Admin', 'SuperAdmin', 'Driver', 'CustomerService'),
    (0, common_1.Get)('protected'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "protected", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
