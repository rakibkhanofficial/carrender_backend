import { Repository } from 'typeorm';
import { Car } from '../../_entities/car.entity';
import { CarDto } from './car.dto';
import { Category } from '../../_entities/category.entity';
import { SubCategory } from '../../_entities/subcategory.entity';
export declare class CarService {
    private readonly carRepository;
    private readonly categoryRepository;
    private readonly subCategoryRepository;
    constructor(carRepository: Repository<Car>, categoryRepository: Repository<Category>, subCategoryRepository: Repository<SubCategory>);
    findByCategory(categoryId: number, page?: number, limit?: number): Promise<{
        data: Car[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findByName(name: string): Promise<Car | undefined>;
    findBySubCategory(subCategoryId: number, page?: number, limit?: number): Promise<{
        data: Car[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(carDto: CarDto, userId: number): Promise<Car>;
    findAll(): Promise<any[]>;
    getPublicList(): Promise<any[]>;
    getCarSlugs(): Promise<{
        strSlug: string;
    }[]>;
    findBySlug(slug: string): Promise<Car>;
    findById(id: number): Promise<Car>;
    update(id: number, carDto: CarDto): Promise<Car>;
    remove(id: number): Promise<void>;
}
