import { Client } from 'pg';

import config  from '../src/config/config'




async function testPostgresConnection() {

    console.log("Database URL:", config);
    const client = new Client({
        connectionString: config.dbUrl
    });
    try {
        await client.connect();
        console.log('Postgres connected successfully');
    } catch (error) {
        console.error('Postgres connection failed:', error);
    } finally {
        await client.end();
    }
}

testPostgresConnection();