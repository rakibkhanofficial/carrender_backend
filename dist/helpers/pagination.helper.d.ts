import { PaginateType } from '../types/paginationType';
export declare const paginate: ({ page, limit, total_items }: PaginateType) => {
    total: number;
    per_page: number;
    total_pages: number;
    current_page: number;
};
