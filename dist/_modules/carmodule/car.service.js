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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const car_entity_1 = require("../../_entities/car.entity");
const category_entity_1 = require("../../_entities/category.entity");
const subcategory_entity_1 = require("../../_entities/subcategory.entity");
let CarService = class CarService {
    constructor(carRepository, categoryRepository, subCategoryRepository) {
        this.carRepository = carRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }
    async findByCategory(categoryId, page = 1, limit = 10) {
        const [cars, total] = await this.carRepository.findAndCount({
            where: { categoryId },
            relations: ['category', 'subCategory'],
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data: cars,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findByName(name) {
        return this.carRepository.findOne({ where: { name } });
    }
    async findBySubCategory(subCategoryId, page = 1, limit = 10) {
        const [cars, total] = await this.carRepository.findAndCount({
            where: { subCategoryId },
            relations: ['category', 'subCategory'],
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data: cars,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async create(carDto, userId) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: carDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException(`Category with id ${carDto.categoryId} not found`);
            }
            if (carDto.subCategoryId) {
                const subCategory = await this.subCategoryRepository.findOne({
                    where: {
                        id: carDto.subCategoryId,
                        categoryId: carDto.categoryId,
                    },
                });
                if (!subCategory) {
                    throw new common_1.NotFoundException(`Subcategory with id ${carDto.subCategoryId} not found or does not belong to the specified category`);
                }
            }
            const car = this.carRepository.create({
                userId,
                ...carDto,
            });
            const result = await this.carRepository.save(car);
            return result;
        }
        catch (error) {
            console.error('Error in create car:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else if (error.code === '23505') {
                throw new common_1.BadRequestException('A car with this slug already exists');
            }
            else if (error.code === '23503') {
                throw new common_1.BadRequestException('Invalid category or subcategory ID');
            }
            else {
                throw new common_1.InternalServerErrorException('An error occurred while creating the car');
            }
        }
    }
    async findAll() {
        try {
            const cars = await this.carRepository
                .createQueryBuilder('car')
                .leftJoin('tblCategory', 'category', 'car.categoryId = category.id')
                .leftJoin('tblSubCategory', 'subcategory', 'car.subCategoryId = subcategory.id')
                .select([
                'car.*',
                'category.name AS categoryName',
                'category.slug AS categorySlug',
                'subcategory.name AS subcategoryName',
            ])
                .where(`car.isAvailable = ${true}`)
                .getRawMany();
            if (cars.length === 0) {
                throw new common_1.NotFoundException('Cars not found');
            }
            else {
                return cars;
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('Cars not found');
        }
    }
    async getPublicList() {
        try {
            const query = await this.carRepository
                .createQueryBuilder('car')
                .leftJoin('tblCategory', 'category', 'car.categoryId = category.id')
                .leftJoin('tblSubCategory', 'subcategory', 'car.subCategoryId = subcategory.id')
                .select([
                'car.id',
                'car.name',
                'car.slug',
                'car.pricePerMile',
                'car.pricePerHour',
                'car.image',
                'car.model',
                'car.year',
                'car.make',
                'car.seatingCapacity',
                'car.hasChildSeat',
                'car.hasWifi',
                'car.luggageCapacity',
                'car.mileagePerGallon',
                'car.transmission',
                'car.fuelType',
                'car.features',
                'car.createdAt',
                'car.updatedAt',
                'car.categoryId',
                'car.subCategoryId',
                'category.name AS categoryName',
                'category.slug AS categorySlug',
                'subcategory.name AS subcategoryName',
            ])
                .where('car.isAvailable = :isAvailable', { isAvailable: true });
            const cars = await query.getRawMany();
            if (cars.length === 0) {
                throw new common_1.NotFoundException('No available cars found');
            }
            return cars;
        }
        catch (error) {
            console.error('Error in getPublicList:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error fetching public car list');
            }
        }
    }
    async getCarSlugs() {
        try {
            const cars = await this.carRepository.find({
                select: ['slug'],
                where: { isAvailable: true },
            });
            if (cars.length === 0) {
                throw new common_1.NotFoundException('No available cars found');
            }
            return cars.map((car) => ({ strSlug: car.slug }));
        }
        catch (error) {
            throw new common_1.NotFoundException('Error fetching car slugs');
        }
    }
    async findBySlug(slug) {
        try {
            const car = await this.carRepository.findOne({
                where: { slug, isAvailable: true },
                relations: ['category', 'subCategory'],
            });
            if (!car)
                throw new common_1.NotFoundException('Car not found');
            return car;
        }
        catch (error) {
            throw new common_1.NotFoundException('Car not found');
        }
    }
    async findById(id) {
        try {
            const car = await this.carRepository.findOne({
                where: { id },
                relations: ['category', 'subCategory'],
            });
            if (!car)
                throw new common_1.NotFoundException('Car not found');
            return car;
        }
        catch (error) {
            throw new common_1.NotFoundException('Car not found');
        }
    }
    async update(id, carDto) {
        try {
            await this.carRepository.update(id, carDto);
            const updatedCar = await this.carRepository.findOne({
                where: { id },
                relations: ['category', 'subCategory'],
            });
            if (!updatedCar)
                throw new common_1.NotFoundException('Car not found');
            return updatedCar;
        }
        catch (error) {
            throw new common_1.NotFoundException('Car cannot be updated. Please try again.');
        }
    }
    async remove(id) {
        try {
            const result = await this.carRepository.delete(id);
            if (result.affected === 0)
                throw new common_1.NotFoundException('Car not found');
        }
        catch (error) {
            throw new common_1.NotFoundException('Car cannot be deleted. Please try again.');
        }
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(subcategory_entity_1.SubCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CarService);
//# sourceMappingURL=car.service.js.map