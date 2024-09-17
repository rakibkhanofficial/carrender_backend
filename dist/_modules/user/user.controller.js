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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const token_validation_guard_1 = require("../../guards/token-validation.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUserStart() {
        console.log('get request from User here');
        return 'User start from here';
    }
    async getUserByEmail(email) {
        return this.userService.findByEmail(email);
    }
    async getUserById(id) {
        console.log('get request', id);
        try {
            const user = await this.userService.findUserById(id);
            if (!user) {
                return {
                    statusCode: 404,
                    message: 'User not found',
                    data: null,
                };
            }
            const { name, phone, email, image, birthdaydate, homeaddress, officeadress, createdAt, updatedAt, } = user;
            return {
                statusCode: 200,
                message: 'User details retrieved successfully',
                data: {
                    name,
                    phone,
                    email,
                    image,
                    birthdaydate,
                    homeaddress,
                    officeadress,
                    createdAt,
                    updatedAt,
                },
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                message: 'Internal server error',
                data: null,
            };
        }
    }
    async updateUser(id, updateData) {
        try {
            const updatedUser = await this.userService.updateUserDetails(id, updateData);
            if (!updatedUser) {
                return { statusCode: 404, message: 'User not found', data: null };
            }
            return {
                statusCode: 200,
                message: 'Information Updated Successfully',
                data: {
                    name: updatedUser.name,
                    phone: updatedUser.phone,
                    email: updatedUser?.email,
                    image: updatedUser?.image,
                    birthdaydate: updatedUser?.birthdaydate,
                    homeaddress: updatedUser?.homeaddress,
                    officeadress: updatedUser?.officeadress,
                    createdAt: updatedUser?.createdAt,
                    updatedAt: updatedUser?.updatedAt,
                },
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                message: 'Error Updating Data',
                data: null,
            };
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserController.prototype, "getUserStart", null);
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.Get)('userdetails/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)('userdetails/update/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(token_validation_guard_1.TokenValidationGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map