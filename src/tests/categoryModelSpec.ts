import 'jasmine';
import { CategoryQueries } from '../models/category';

const queries = new CategoryQueries();

describe('Category Model Tests', () => {
  it('should have an index method', () => {
    expect(queries.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(queries.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(queries.create).toBeDefined();
  });
});
