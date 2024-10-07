import bcrypt from 'bcrypt';
import client from '../database';

const {
  SALT_ROUNDS,
  PEPPER
} = process.env;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
};

export class UserQueries {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT firstName, lastName, email FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot connect to database: ${error}`);
    }
  }

  async show(id: string): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT firstName, lastName, email FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isActive: boolean = true,
  ): Promise<User[]> {
    try {
      const saltCount = SALT_ROUNDS as unknown;
      const hash = bcrypt.hashSync(password+PEPPER, saltCount as number); // 10 salt rounds
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, email, password, isActive) VALUES ($1, $2, $3, $4, $5)';
      const result = await connection.query(sql, [
        firstName,
        lastName,
        email,
        hash,
        isActive,
      ]);
      console.log(result.rows);
      connection.release();
      const authenticatedUser = this.authenticate(email, password);
      return authenticatedUser;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async authenticate(email: string, password: string) {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE email=($1)';
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password+PEPPER, user.password)) {
          return user;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Could not authenticate user with this email: ${email}`);
    }
  }
}
