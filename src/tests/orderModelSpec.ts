import 'jasmine';
import { OrderQueries } from '../models/order';

const queries = new OrderQueries();

describe('Order Model Tests', () => {
  it('should have an index method', () => {
    expect(queries.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(queries.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(queries.create).toBeDefined();
  });

  it('should have a showOpenOrdersByUsers method', () => {
    expect(queries.showOpenOrdersByUser).toBeDefined();
  });

  it('should have a showClosedOrdersByUsers method', () => {
    expect(queries.showClosedOrdersByUser).toBeDefined();
  });
});
