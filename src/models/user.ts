import client from '../database';

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
}

export class UserQueries {
    async index(): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch(error) {
            throw new Error(`Cannot connect to database: ${error}`);
        }
    }

    async show(id:string): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        } catch(error) {
            throw new Error(`${error}`);
        }
    }

    async create(firstName:string, lastName:string, email:string, password:string, isActive:boolean=true): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sql = 'INSERT INTO users (firstName, lastName, email, password, isActive) VALUES ($1, $2, $3, $4, $5)';
            const result = await connection.query(sql,[firstName, lastName, email, password, isActive]);
            const newUser = result.rows[0];
            connection.release();
            return newUser;
        } catch(error) {
            throw new Error(`${error}`);
        }
    }
}