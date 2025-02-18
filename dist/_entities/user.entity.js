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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const car_entity_1 = require("./car.entity");
const car_booking_entity_1 = require("./car_booking.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthdaydate", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "homeaddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "officeadress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => car_entity_1.Car, (car) => car.user),
    __metadata("design:type", Array)
], User.prototype, "cars", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => car_booking_entity_1.CarBooking, (carBooking) => carBooking.driver),
    __metadata("design:type", Array)
], User.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "access_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "access_tokenExpiresIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refresh_tokenExpiresIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map