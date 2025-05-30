import { Repository } from 'typeorm';
import { Category } from '../../_entities/category.entity';
import { CategoryDto } from './category.dto';
import { PublicCategory } from './category.types';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findAll(): Promise<Category[]>;
    findByName(name: string): Promise<Category | undefined>;
    findPublicCategoryList(): Promise<PublicCategory[]>;
    findById(id: number): Promise<Category>;
    create(categoryDto: CategoryDto, userId: number): Promise<Category>;
    update(id: number, categoryDto: CategoryDto): Promise<Category>;
    remove(id: number): Promise<void>;
}
