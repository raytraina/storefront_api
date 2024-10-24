import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    PG_HOST,
    PG_DB_URI,
    PG_TEST_DB_URI,
    PG_USER,
    PG_PASSWORD,
    ENV
} = process.env;

let client: Pool;

if(ENV === 'test') {
    client = new Pool({
        host: PG_HOST,
        database: PG_TEST_DB_URI,
        user: PG_USER,
        password: PG_PASSWORD
    })
} else {
    client = new Pool({
        host: PG_HOST,
        database: PG_DB_URI,
        user: PG_USER,
        password: PG_PASSWORD
    })
}

export default client;
