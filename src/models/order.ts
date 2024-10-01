import client from '../database';

export type Order = {
    id: number;
    userId: number;
    orderStatus: string;
}

export class OrderQueries {
    async index(): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch(error) {
            throw new Error(`Cannot connect to database: ${error}`);
        }
    }

    async show(id:string): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        } catch(error) {
            throw new Error(`${error}`);
        }
    }

    async create(userId:string, orderStatus:string='active'): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sql = 'INSERT INTO orders (userId, orderStatus) VALUES ($1, $2)';
            const result = await connection.query(sql,[userId, orderStatus]);
            const newUser = result.rows[0];
            connection.release();
            return newUser;
        } catch(error) {
            throw new Error(`${error}`);
        }
    }

    async show_by_user(userId:string) {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM orders WHERE userId=($1)';
            const result = await connection.query(sql,[userId]);
            connection.release();
            return result.rows;
        } catch(error) {
            throw new Error(`${error}`);
        }
    }
}