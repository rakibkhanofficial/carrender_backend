"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const car_entity_1 = require("../../_entities/car.entity");
const car_service_1 = require("./car.service");
const car_controller_1 = require("./car.controller");
const auth_module_1 = require("../auth/auth.module");
const category_module_1 = require("../category/category.module");
const subcategory_module_1 = require("../subcategory/subcategory.module");
let CarModule = class CarModule {
};
exports.CarModule = CarModule;
exports.CarModule = CarModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([car_entity_1.Car]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            category_module_1.CategoryModule,
            subcategory_module_1.SubCategoryModule,
        ],
        providers: [car_service_1.CarService],
        controllers: [car_controller_1.CarController],
        exports: [car_service_1.CarService],
    })
], CarModule);
