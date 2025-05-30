import { SubCategoryDto } from './subcategory.dto';
import { SubCategoryService } from './subcategory.service';
interface RequestWithUser extends Request {
    user?: {
        userId: number;
    };
}
export declare class SubCategoryController {
    private readonly subCategoryService;
    constructor(subCategoryService: SubCategoryService);
    findAll(): Promise<{
        statusCode: number;
        message: string;
        data: import("../../_entities/subcategory.entity").SubCategory[];
    }>;
    findAllByCategoryId(id: number): Promise<{
        statusCode: number;
        message: string;
        data: import("../../_entities/subcategory.entity").SubCategory[];
    }>;
    findOne(id: number): Promise<{
        statusCode: number;
        message: string;
        data: import("../../_entities/subcategory.entity").SubCategory;
    }>;
    create(request: RequestWithUser, subCategoryDto: SubCategoryDto): Promise<{
        statusCode: number;
        error: string;
        message?: undefined;
        data?: undefined;
    } | {
        statusCode: number;
        message: string;
        data: import("../../_entities/subcategory.entity").SubCategory;
        error?: undefined;
    }>;
    update(id: number, subCategoryDto: SubCategoryDto): Promise<{
        statusCode: number;
        message: string;
        data: import("../../_entities/subcategory.entity").SubCategory;
    }>;
    remove(id: number): Promise<{
        statusCode: number;
        message: string;
        data: void;
    }>;
}
export {};
