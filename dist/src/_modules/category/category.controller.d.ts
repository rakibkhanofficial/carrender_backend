import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
interface RequestWithUser extends Request {
    user?: {
        userId: number;
    };
}
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<{
        statusCode: number;
        message: string;
        data: import("../../_entities/category.entity").Category[];
    }>;
    PubliccategoryList(): Promise<{
        statusCode: number;
        message: string;
        data: import("./category.types").PublicCategory[];
    }>;
    findOne(id: number): Promise<import("../../_entities/category.entity").Category>;
    create(request: RequestWithUser, categoryDto: CategoryDto): Promise<{
        statusCode: number;
        error: string;
        message?: undefined;
        data?: undefined;
    } | {
        statusCode: number;
        message: string;
        data: import("../../_entities/category.entity").Category;
        error?: undefined;
    } | {
        statusCode: number;
        message: string;
        error?: undefined;
        data?: undefined;
    }>;
    update(id: number, categoryDto: CategoryDto): Promise<{
        statusCode: number;
        message: string;
        data: import("../../_entities/category.entity").Category;
    }>;
    remove(id: number): Promise<{
        statusCode: number;
        message: string;
        data: void;
    }>;
}
export {};
