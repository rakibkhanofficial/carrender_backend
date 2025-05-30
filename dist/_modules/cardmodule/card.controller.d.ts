import { CardService } from './card.service';
import { CreateCardDto, UpdateCardDto } from './card.dto';
interface RequestWithUser extends Request {
    user?: {
        userId: number;
    };
}
export declare class CardController {
    private readonly cardService;
    constructor(cardService: CardService);
    create(createCardDto: CreateCardDto, req: RequestWithUser): Promise<import("../../_entities/card.entity").Card>;
    findAll(): Promise<import("../../_entities/card.entity").Card[]>;
    findAllByUser(req: RequestWithUser): Promise<import("../../_entities/card.entity").Card[]>;
    findOne(id: string, req: RequestWithUser): Promise<import("../../_entities/card.entity").Card>;
    update(id: string, updateCardDto: UpdateCardDto, req: RequestWithUser): Promise<import("../../_entities/card.entity").Card>;
    remove(id: string, req: RequestWithUser): Promise<void>;
}
export {};
