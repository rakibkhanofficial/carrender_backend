export declare class CreateCardDto {
    userId: number;
    number: string;
    holder: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    type: string;
}
export declare class UpdateCardDto {
    number?: string;
    holder?: string;
    expiryMonth?: string;
    expiryYear?: string;
    cvv?: string;
    type?: string;
}
