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
        try{
            await client.end(); 
            console.log("Closed");
        }catch(err){

            console.log("-------------")
            console.log("Error closing connection", err);
        }
    }
}

testPostgresConnection();