import { SubCategory } from './subcategory.entity';
import { Car } from './car.entity';
export declare class Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    userId: number;
    subCategories: SubCategory[];
    cars: Car[];
    createdAt: Date;
    updatedAt: Date;
}
