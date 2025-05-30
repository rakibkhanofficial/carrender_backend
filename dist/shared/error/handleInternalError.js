"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInternalError = void 0;
const handleInternalError = (error, res) => {
    return res.status(500).json({
        error: error.message,
        message: 'Internal Server Error',
    });
};
exports.handleInternalError = handleInternalError;
