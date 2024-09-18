"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const user_module_1 = require("../_modules/user/user.module");
const database_config_1 = require("../config/database.config");
const car_module_1 = require("../_modules/carmodule/car.module");
const auth_module_1 = require("../_modules/auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const blob_controller_1 = require("../_modules/blobmodule/blob.controller");
const blob_service_1 = require("../_modules/blobmodule/blob.service");
const image_entity_1 = require("../_entities/image.entity");
const category_module_1 = require("../_modules/category/category.module");
const subcategory_module_1 = require("../_modules/subcategory/subcategory.module");
const car_booking_module_1 = require("../_modules/carbookingModule/car_booking.module");
const payment_module_1 = require("../_modules/paymentmodule/payment.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot(database_config_1.typeOrmConfig),
            typeorm_1.TypeOrmModule.forFeature([image_entity_1.Image]),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/',
                exclude: ['/api*', '/auth', 'products'],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            subcategory_module_1.SubCategoryModule,
            car_module_1.CarModule,
            car_booking_module_1.CarBookingModule,
            payment_module_1.PaymentModule,
        ],
        controllers: [app_controller_1.AppController, blob_controller_1.BlobController],
        providers: [jwt_1.JwtService, app_service_1.AppService, blob_service_1.BlobService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map