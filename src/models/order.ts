import client from '../database';

export type Order = {
  id: number;
  userId: number;
  orderStatus: string;
};

export class OrderQueries {
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot connect to database: ${error}`);
    }
  }

  async show(id: string): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async create(
    userId: string,
    orderStatus: string = 'active',
  ): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO orders (userId, orderStatus) VALUES ($1, $2)';
      const result = await connection.query(sql, [userId, orderStatus]);
      const newOrder = result.rows[0];
      connection.release();
      return newOrder;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async showOpenOrdersByUser(userId: string): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE userId=($1) AND orderStatus='active'";
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot connect to database: ${error}`);
    }
  }

  async showClosedOrdersByUser(userId: string): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE userId=($1) AND orderStatus='complete'";
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot connect to database: ${error}`);
    }
  }

  /* TODO - Update order status once fulfilled
  async fulfillOrder(
    userId: string,
    orderStatus: string = 'active',
  ): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'UPDATE orders SET orderStatus="complete" WHERE userId=($1) AND orderStatus="active"';
      const result = await connection.query(sql, [userId, orderStatus]);
      const newUser = result.rows[0];
      connection.release();
      return newUser;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  */
}
