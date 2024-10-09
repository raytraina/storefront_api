import 'jasmine';
import { ProductQueries } from '../models/product';

const queries = new ProductQueries();

describe('Product Model Tests', () => {
  it('should have an index method', () => {
    expect(queries.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(queries.create).toBeDefined();
  });

  it('should have a showByCategory method', () => {
    expect(queries.showByCategory).toBeDefined();
  });
});
