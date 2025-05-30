import { Category } from './category.entity';
import { Car } from './car.entity';
export declare class SubCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    category: Category;
    categoryId: number;
    userId: number;
    cars: Car[];
    createdAt: Date;
    updatedAt: Date;
}
