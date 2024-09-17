import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  autoLoadEntities: true,
  entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
  synchronize: true, // set to false in production
};
