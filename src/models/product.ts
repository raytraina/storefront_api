import client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
};

export class ProductQueries {
  public async index():Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot connect to database: ${error}`);
    }
  }

  public async show(id: string):Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public async create(
    name: string,
    price: number,
    description: string,
    categoryId: string,
  ):Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO products (name, price, description, categoryId) VALUES ($1, $2, $3, $4)';
      const result = await connection.query(sql, [
        name,
        price,
        description,
        categoryId,
      ]);
      const newUser = result.rows[0];
      connection.release();
      return newUser;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public async show_popular() {
    try {
      return 'pass';
      //   TODO group productorders by product id  get count return highest 5 count
      // const connection = await client.connect();
      // const sql = 'SELECT * FROM products WHERE id=($1)';
      // const result = await connection.query(sql,[id]);
      // connection.release();
      // return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public async show_by_category(categoryId: string) {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products WHERE categoryId=($1)';
      const result = await connection.query(sql, [categoryId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
