import dotenv from 'dotenv';
import path from 'path';

// Always load from root-level .env regardless of execution directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default {
    dbUrl: process.env.DATABASE_URL !== undefined ? process.env.DATABASE_URL : 'postgres://user:password@localhost:5432/mydatabase',
    port: process.env.PORT !== undefined ? process.env.PORT : 5000,
    jwtSecret: process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : ''
};
