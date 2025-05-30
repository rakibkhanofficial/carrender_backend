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
exports.SubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subcategory_entity_1 = require("../../_entities/subcategory.entity");
let SubCategoryService = class SubCategoryService {
    constructor(subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }
    async findAll() {
        return this.subCategoryRepository.find({ relations: ['category'] });
    }
    async findBycategoryId(id) {
        console.log('categoryId', id);
        const subcategory = await this.subCategoryRepository.find({
            where: { categoryId: id },
        });
        return subcategory;
    }
    async findById(id) {
        const subCategory = await this.subCategoryRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!subCategory) {
            throw new common_1.NotFoundException('SubCategory not found');
        }
        return subCategory;
    }
    async findByName(name) {
        return this.subCategoryRepository.findOne({ where: { name } });
    }
    async create(subCategoryDto, userId) {
        const subCategory = this.subCategoryRepository.create({
            ...subCategoryDto,
            userId,
        });
        return this.subCategoryRepository.save(subCategory);
    }
    async update(id, subCategoryDto) {
        await this.subCategoryRepository.update(id, subCategoryDto);
        return this.findById(id);
    }
    async remove(id) {
        const result = await this.subCategoryRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('SubCategory not found');
        }
    }
};
exports.SubCategoryService = SubCategoryService;
exports.SubCategoryService = SubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subcategory_entity_1.SubCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubCategoryService);
