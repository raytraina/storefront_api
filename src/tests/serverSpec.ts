import request from 'supertest';
import 'jasmine';
import { app } from '../server';

describe('Test user routes', () => {
  // FIX
  // /api/users/:userId/orders?status=active
  it('gets the /api/users/:userId/orders?status=active endpoint', async () => {
    const response = await request(app).get('/api/users/1/orders?status=active');
    // const parsed = JSON.parse(response.text);
    // expect(parsed.length).toBe(2);
    expect(response.text).toBe('active');
  });

  // FIX
  // /api/users/:userId/orders?status=complete
  it('gets the /api/users/:userId/orders?status=complete endpoint', async () => {
    const response = await request(app).get('/api/users/1/orders?status=complete');
    // const parsed = JSON.parse(response.text);
    // expect(parsed.length).toBe(2);
    expect(response.text).toBe('complete');
  });

  it('posts to the /api/users/new endpoint and validates authentication', async () => {
    const payload = {
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      password: 'pw1234'
    };
    const response = await request(app).post('/api/users/new').send(payload);
    const parsedToken = JSON.parse(response.text);
    expect(parsedToken).toBeInstanceOf(String);

    /*
    // FIX
    // Test creating new product given returned JWT
    it('posts to the /api/products/new endpoint', async () => {
      const payTwo = {
        token: parsedToken,
        name: 'Test Product #3',
        price: 5,
        description: 'Cool cool cool',
        categoryId: '1'
      }
      const respTwo = await request(app).post('/api/products/new').send(payTwo);
      const newProduct = JSON.parse(respTwo.text);
      expect(newProduct.length).toBe(8);
    });
    */
  });
});

describe('Test product routes', () => {
  it('gets the /api/products endpoint', async () => {
    const response = await request(app).get('/api/products');
    const parsed = JSON.parse(response.text);
    expect(parsed.length).toBe(8);
  });

  it('gets the /api/products/:id endpoint', async () => {
    const response = await request(app).get('/api/products/1');
    const parsed = JSON.parse(response.text);
    expect(Object.keys(parsed)).toContain('description');
  });

  it('gets the /api/products/category/:categoryId endpoint', async () => {
    const response = await request(app).get('/api/products/category/1');
    const parsed = JSON.parse(response.text);
    expect(parsed.length).toBe(2);
  });
});

describe('Test category routes', () => {
  it('gets the /api/categories endpoint', async () => {
    const response = await request(app).get('/api/categories/');
    const parsed = JSON.parse(response.text);
    expect(parsed.length).toBe(4);
  });

  it('gets the /api/categories/:id endpoint', async () => {
    const response = await request(app).get('/api/categories/1');
    expect(response.text).toEqual('{"id":1,"commonname":"all"}');
  });
});

describe('Test misc routes', () => {
  it('gets the root route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Hello World!')
  });

  it('gets the /api/ route without token', async () => {
    const response = await request(app).get('/api');
    expect(response.text).toContain('Try going to a different URL');
  });
});
