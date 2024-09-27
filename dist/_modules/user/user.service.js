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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async getAllDriverList() {
        return this.userRepository.find({
            where: { role: 'Driver' },
            select: {
                userId: true,
                name: true,
                email: true,
                phone: true,
                image: true,
                birthdaydate: true,
                homeaddress: true,
                officeadress: true,
                role: true,
                isActive: true,
            },
        });
    }
    async getAllCustomerList() {
        return this.userRepository.find({
            where: { role: 'Customer' },
            select: {
                userId: true,
                name: true,
                email: true,
                phone: true,
                image: true,
                birthdaydate: true,
                homeaddress: true,
                officeadress: true,
                role: true,
                isActive: true,
            },
        });
    }
    async findUserById(id) {
        return this.userRepository.findById(id);
    }
    async updateUserDetails(id, updateData) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.name = updateData.name;
        user.phone = updateData.phone;
        user.email = updateData.email;
        user.image = updateData.image;
        user.birthdaydate = updateData.birthdaydate;
        user.homeaddress = updateData.homeaddress;
        user.officeadress = updateData.officeadress;
        user.createdAt = new Date(updateData.createdAt);
        user.updatedAt = new Date();
        console.log(`To Updated`, user);
        const response = this.userRepository.save(user);
        console.log(response);
        return response;
    }
    async createUser(name, role, email, image, phone, password) {
        return this.userRepository.createUser(name, role, email, image, phone, password);
    }
    async OauthcreateUser(name, role, email, password, access_token, provider, providerId) {
        return this.userRepository.OauthCreateUser(name, role, email, password, access_token, provider, providerId);
    }
    async updateUser(user) {
        return this.userRepository.updateUser(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map