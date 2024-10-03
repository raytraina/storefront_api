import client from '../database';

export type ProductOrder = {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
};

export class ProductOrderQueries {
  async index(): Promise<ProductOrder[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM productOrders';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot connect to database: ${error}`);
    }
  }

  async show(id: string): Promise<ProductOrder[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM productOrders WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async create(
    productId: string,
    orderId: string,
    quantity: number = 1,
  ): Promise<ProductOrder[]> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO productOrders (productId, orderId, quantity) VALUES ($1, $2, $3)';
      const result = await connection.query(sql, [
        productId,
        orderId,
        quantity,
      ]);
      const newUser = result.rows[0];
      connection.release();
      return newUser;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
