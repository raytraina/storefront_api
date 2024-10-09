import 'jasmine';
import { ProductOrderQueries } from '../models/productOrder';

const queries = new ProductOrderQueries();

describe('ProductOrder Model Tests', () => {
  it('should have an index method', () => {
    expect(queries.indexProductOrders).toBeDefined();
  });

  it('should have a show method', () => {
    expect(queries.showProductOrders).toBeDefined();
  });

  it('should have a create method', () => {
    expect(queries.createProductOrder).toBeDefined();
  });
});
