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
exports.BlobController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const blob_service_1 = require("./blob.service");
let BlobController = class BlobController {
    constructor(blobService) {
        this.blobService = blobService;
    }
    async uploadFile(file) {
        try {
            const savedImage = await this.blobService.uploadImage(file);
            return {
                statusCode: 200,
                message: 'File uploaded successfully',
                data: {
                    id: savedImage.id,
                    filename: savedImage.filename,
                    url: savedImage.url,
                    uploadedAt: savedImage.uploadedAt,
                },
            };
        }
        catch (error) {
            console.error('Error uploading file:', error);
            return {
                statusCode: 500,
                message: 'Error uploading file',
                data: null,
            };
        }
    }
};
exports.BlobController = BlobController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlobController.prototype, "uploadFile", null);
exports.BlobController = BlobController = __decorate([
    (0, common_1.Controller)('blob'),
    __metadata("design:paramtypes", [blob_service_1.BlobService])
], BlobController);
//# sourceMappingURL=blob.controller.js.map