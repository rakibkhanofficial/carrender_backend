"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
exports.isValidEmail = isValidEmail;
const isEmpty = (data) => {
    return data == null || data === '' || data.length === 0;
};
exports.isEmpty = isEmpty;
//# sourceMappingURL=index.js.map