import { User } from './user.entity';
import { Category } from './category.entity';
import { SubCategory } from './subcategory.entity';
export declare class Car {
    id: number;
    userId: number;
    user: User;
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
    category: Category;
    categoryId: number;
    subCategory: SubCategory;
    subCategoryId: number;
    createdAt: Date;
    updatedAt: Date;
}
