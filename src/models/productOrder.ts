import client from '../database';

export type ProductOrder = {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
};

export class ProductOrderQueries {
  async indexProductOrders(orderId:number): Promise<ProductOrder[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM productOrders WHERE orderId=($1)';
      const result = await connection.query(sql, [orderId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot connect to database: ${error}`);
    }
  }

  async showProductOrders(orderId: string): Promise<ProductOrder[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM productOrders WHERE orderId=($1)';
      const result = await connection.query(sql, [orderId]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async createProductOrder(
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
      const newProductOrder = result.rows[0];
      connection.release();
      return newProductOrder;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /* TODO - fix sql - group productorders by product id  get count return highest 5 count
  async showPopularProducts():Promise<ProductOrder[]> {
    try {
      const connection = await client.connect();
      // TODO - FIX SQL - this is not what I want, need to get count and use aggregate og all productIds with highest quantities ordered
      const sql = 'SELECT productId FROM productOrders ORDER BY quantity DESC LIMIT 5';
      const result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  */
}
