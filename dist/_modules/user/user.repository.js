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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../_entities/user.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findByEmail(email) {
        return this.findOne({ where: { email } });
    }
    async findById(userId) {
        return this.findOne({ where: { userId } });
    }
    async createUser(name, role, email, image, phone, password) {
        const user = this.create({
            name,
            role,
            email,
            image,
            phone,
            password,
            provider: 'Manual',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return this.save(user);
    }
    async OauthCreateUser(name, role, email, password, access_token, provider, providerId) {
        const user = this.create({
            name,
            role,
            email,
            password,
            access_token,
            provider,
            providerId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return this.save(user);
    }
    async updateUser(user) {
        return this.save(user);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map