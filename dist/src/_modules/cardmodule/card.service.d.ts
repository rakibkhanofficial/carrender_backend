import { Repository } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from './card.dto';
import { Card } from '../../_entities/card.entity';
export declare class CardService {
    private cardRepository;
    constructor(cardRepository: Repository<Card>);
    findAll(): Promise<Card[]>;
    findAllByUserId(userId: number): Promise<Card[]>;
    findOne(id: number, userId: number): Promise<Card>;
    create(createCardDto: CreateCardDto): Promise<Card>;
    update(id: number, updateCardDto: UpdateCardDto, userId: number): Promise<Card>;
    remove(id: number, userId: number): Promise<void>;
}
