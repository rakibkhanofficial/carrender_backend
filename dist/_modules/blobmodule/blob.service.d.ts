import { Repository } from 'typeorm';
import { Image } from '../../_entities/image.entity';
export declare class BlobService {
    private imageRepository;
    private readonly logger;
    constructor(imageRepository: Repository<Image>);
    uploadImage(file: Express.Multer.File): Promise<Image>;
}
