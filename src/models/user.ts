import bcrypt from 'bcrypt';
import client from '../database';

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
      const sql = 'SELECT * FROM users';
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
      const sql = 'SELECT * FROM users WHERE id=($1)';
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
      // TODO create pw hash + pepper here
      const hash = bcrypt.hashSync(password, 10); //10 salt rounds for test
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
      console.log(result);
      connection.release();
      const authenticatedUser = this.authenticate(email, password);
      return authenticatedUser;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async authenticate(email:string, password:string ) {
    try {    
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE email=($1)';
      const result = await connection.query(sql, [email]);
      if(result.rows.length) {
        const user = result.rows[0];
        console.log(user);
        if (bcrypt.compareSync(password, user.password)) {
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
