import { BlobService } from './blob.service';
interface UploadedImage {
    id: number;
    filename: string;
    url: string;
    uploadedAt: Date;
}
interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T | null;
}
export declare class BlobController {
    private readonly blobService;
    constructor(blobService: BlobService);
    uploadFile(file: Express.Multer.File): Promise<ApiResponse<UploadedImage>>;
}
export {};
