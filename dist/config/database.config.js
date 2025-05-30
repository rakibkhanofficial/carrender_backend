"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)();
exports.typeOrmConfig = {
    type: 'mysql',
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    autoLoadEntities: true,
    entities: [(0, path_1.join)(__dirname, '..', '**', '*.entity.{js,ts}')],
    synchronize: true,
};
//# sourceMappingURL=database.config.js.map