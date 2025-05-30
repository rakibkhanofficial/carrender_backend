"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.jwtConfig = {
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: '3600s',
    },
};
//# sourceMappingURL=jwt.config.js.map