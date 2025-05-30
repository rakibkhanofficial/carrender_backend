import { Request, Response } from 'express';
import { CarDto } from './car.dto';
import { CarService } from './car.service';
interface RequestWithUser extends Request {
    user?: {
        userId: number;
    };
}
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    getPublicList(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    getPublicDetailsBySlug(request: Request, response: Response, slug: string): Promise<Response<any, Record<string, any>>>;
    findAll(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    getCarsByCategory(categoryId: number, page?: number, limit?: number): Promise<{
        data: {
            categoryName: string;
            subCategoryName: string;
            id: number;
            userId: number;
            user: import("../../_entities/user.entity").User;
            name: string;
            description: string;
            slug: string;
            image: string;
            pricePerHour: number;
            pricePerMile: number;
            model: string;
            year: number;
            make: string;
            seatingCapacity: number;
            hasChildSeat: boolean;
            hasWifi: boolean;
            luggageCapacity: number;
            mileagePerGallon: number;
            transmission: string;
            fuelType: string;
            features: string[];
            isAvailable: boolean;
            isActive: boolean;
            category: import("../../_entities/category.entity").Category;
            categoryId: number;
            subCategory: import("../../_entities/subcategory.entity").SubCategory;
            subCategoryId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getCarsBySubCategory(subCategoryId: number, page?: number, limit?: number): Promise<{
        data: {
            categoryName: string;
            subCategoryName: string;
            id: number;
            userId: number;
            user: import("../../_entities/user.entity").User;
            name: string;
            description: string;
            slug: string;
            image: string;
            pricePerHour: number;
            pricePerMile: number;
            model: string;
            year: number;
            make: string;
            seatingCapacity: number;
            hasChildSeat: boolean;
            hasWifi: boolean;
            luggageCapacity: number;
            mileagePerGallon: number;
            transmission: string;
            fuelType: string;
            features: string[];
            isAvailable: boolean;
            isActive: boolean;
            category: import("../../_entities/category.entity").Category;
            categoryId: number;
            subCategory: import("../../_entities/subcategory.entity").SubCategory;
            subCategoryId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(request: Request, response: Response, id: number): Promise<Response<any, Record<string, any>> | {
        statusCode: number;
        data: {
            categoryName: string;
            subCategoryName: string;
            id: number;
            userId: number;
            user: import("../../_entities/user.entity").User;
            name: string;
            description: string;
            slug: string;
            image: string;
            pricePerHour: number;
            pricePerMile: number;
            model: string;
            year: number;
            make: string;
            seatingCapacity: number;
            hasChildSeat: boolean;
            hasWifi: boolean;
            luggageCapacity: number;
            mileagePerGallon: number;
            transmission: string;
            fuelType: string;
            features: string[];
            isAvailable: boolean;
            isActive: boolean;
            category: import("../../_entities/category.entity").Category;
            categoryId: number;
            subCategory: import("../../_entities/subcategory.entity").SubCategory;
            subCategoryId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    create(request: RequestWithUser, response: Response, carDto: CarDto): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response, id: number, carDto: CarDto): Promise<Response<any, Record<string, any>>>;
    remove(request: Request, response: Response, id: number): Promise<Response<any, Record<string, any>>>;
}
export {};
