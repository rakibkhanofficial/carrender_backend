"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = ({ page, limit, total_items }) => {
    const pageTotal = Math.ceil(total_items / limit);
    return {
        total: total_items,
        per_page: limit,
        total_pages: pageTotal,
        current_page: page,
    };
};
exports.paginate = paginate;
