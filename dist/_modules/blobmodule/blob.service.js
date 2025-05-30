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
var BlobService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlobService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blob_1 = require("@vercel/blob");
const image_entity_1 = require("../../_entities/image.entity");
let BlobService = BlobService_1 = class BlobService {
    constructor(imageRepository) {
        this.imageRepository = imageRepository;
        this.logger = new common_1.Logger(BlobService_1.name);
    }
    async uploadImage(file) {
        try {
            this.logger.log('Uploading file to Vercel Blob storage...');
            const blob = await (0, blob_1.put)(file.originalname, file.buffer, {
                access: 'public',
            });
            this.logger.log('File uploaded successfully');
            const image = new image_entity_1.Image();
            image.filename = file.originalname;
            image.url = blob.url;
            const savedImage = await this.imageRepository.save(image);
            this.logger.log(`Image information saved to database with ID: ${savedImage.id}`);
            return savedImage;
        }
        catch (error) {
            this.logger.error(`Failed to upload image: ${error.message}`);
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }
};
exports.BlobService = BlobService;
exports.BlobService = BlobService = BlobService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlobService);
