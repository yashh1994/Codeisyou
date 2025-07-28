import dotenv from 'dotenv';
import path from 'path';

// Always load from root-level .env regardless of execution directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default {
    dbUrl: process.env.DATABASE_URL !== undefined ? process.env.DATABASE_URL : 'postgres://user:password@localhost:5432/mydatabase',
    port: process.env.PORT !== undefined ? process.env.PORT : 5000,
    jwtSecret: process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : '',
    
    // LeetCode configuration
    sample_leetcode_username: process.env.LEETCODE_USERNAME !== undefined ? process.env.LEETCODE_USERNAME : 'default_username',
    sample_leetcode_session: process.env.LEETCODE_SESSION !== undefined ? process.env.LEETCODE_SESSION : 'default_session',
    leetcode_graphql_url: process.env.LEETCODE_GRAPHQL_URL !== undefined ? process.env.LEETCODE_GRAPHQL_URL : 'https://leetcode.com/graphql',

    // Codeforces configuration
    codeforces_api_key: process.env.CODEFORCES_API_KEY !== undefined ? process.env.CODEFORCES_API_KEY : 'your_api_key',
    codeforces_secret: process.env.CODEFORCES_SECRET !== undefined ? process.env.CODEFORCES_SECRET : 'your_secret',
    codeforces_username: process.env.CODEFORCES_USERNAME !== undefined ? process.env.CODEFORCES_USERNAME : 'your_username',
};
