import { UserQueries } from '../models/user';

const queries = new UserQueries();

describe("User Model Tests", () => {
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