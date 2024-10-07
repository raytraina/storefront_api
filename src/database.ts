import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    PG_HOST,
    PG_DB_URI,
    PG_TEST_DB_URI,
    // PG_USER,
    // PG_PASSWORD,
    ENV
} = process.env;

let client: Pool;

// const client = new Pool({
//     host: PG_HOST,
//     database: PG_DB_URI,
// })

if(ENV === 'test') {
    client = new Pool({
        host: PG_HOST,
        database: PG_TEST_DB_URI,
    })
} else {
    client = new Pool({
        host: PG_HOST,
        database: PG_DB_URI,
    })
}

export default client;
