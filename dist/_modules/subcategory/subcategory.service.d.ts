import { Repository } from 'typeorm';
import { SubCategory } from '../../_entities/subcategory.entity';
import { SubCategoryDto } from './subcategory.dto';
export declare class SubCategoryService {
    private readonly subCategoryRepository;
    constructor(subCategoryRepository: Repository<SubCategory>);
    findAll(): Promise<SubCategory[]>;
    findBycategoryId(id: number): Promise<SubCategory[]>;
    findById(id: number): Promise<SubCategory>;
    findByName(name: string): Promise<SubCategory | undefined>;
    create(subCategoryDto: SubCategoryDto, userId: number): Promise<SubCategory>;
    update(id: number, subCategoryDto: SubCategoryDto): Promise<SubCategory>;
    remove(id: number): Promise<void>;
}
