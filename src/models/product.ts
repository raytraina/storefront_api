import client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
};

export class ProductQueries {
  async index(): Promise<Product[]> {
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

  async show(id: string): Promise<Product[]> {
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

  async create(
    name: string,
    price: number,
    description: string,
    categoryId: string,
  ): Promise<Product[]> {
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
      const newProduct = result.rows[0];
      connection.release();
      return newProduct;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async showByCategory(categoryId: string) {
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
