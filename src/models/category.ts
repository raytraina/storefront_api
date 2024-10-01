import client from '../database';

export type Category = {
    id: number;
    commonName: string;
}

export class CategoryQueries {
    async index(): Promise<Category[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM categories';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch(error) {
            throw new Error(`Cannot connect to database: ${error}`);
        }
    }

    async show(id:string): Promise<Category[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM categories WHERE id=($1)';
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        } catch(error) {
            throw new Error(`${error}`);
        }
    }

    async create(commonName:string): Promise<Category[]> {
        try {
            const connection = await client.connect();
            const sql = 'INSERT INTO categories (commonName) VALUES ($1)';
            const result = await connection.query(sql,[commonName]);
            const newUser = result.rows[0];
            connection.release();
            return newUser;
        } catch(error) {
            throw new Error(`${error}`);
        }
    }
}