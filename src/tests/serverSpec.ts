import request from 'supertest';
import 'jasmine';
import { app } from '../server';

describe('Test user routes', () => {
  // including valid JWT since tests will error if not run in a specific order
  let parsedToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0aW5nIiwiZW1haWwiOiJwb29vcGVyQHBkZWVkLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEllNXROcTVXczNWMEc1ZUhZRDFzVWV2dURhTjVXa25nZlZjN1JJVnFtQVNsNzViQnByN3FTIiwiaXNhY3RpdmUiOnRydWV9LCJpYXQiOjE3Mjg1MTg3NTF9.8qw7GeLQ8fgyDrz316hA-dqwQkS6dzSvkEc-WwmPWYo';

  it('posts to the /api/users/new endpoint and validates authentication', async () => {
    const payload = {
      first: 'Test',
      last: 'User',
      email: `test@test${Math.floor(Math.random() * 10)}.com`,
      password: 'pw1234',
    };
    const response = await request(app).post('/api/users/new').send(payload);
    parsedToken = JSON.parse(response.text);
    expect(parsedToken).toBeInstanceOf(String);
  });

  it('posts to the /api/products/new endpoint', async () => {
    if (parsedToken !== '') {
      const payload = {
        token: parsedToken,
        name: 'Test Product #3',
        price: 5,
        description: 'Cool cool cool',
        categoryId: '1',
      };
      const response = await request(app)
        .post('/api/products/new')
        .send(payload);
      expect(response.text).toContain('Success');
    } else {
      expect(parsedToken).toContain('This should indicate failure');
    }
  });

  it('gets the /api/users/:userId/orders?status=active endpoint', async () => {
    if (parsedToken !== '') {
      const response = await request(app)
        .get('/api/users/1/orders?status=active')
        .set('Authorization', `Bearer ${parsedToken}`);
      const parsed = JSON.parse(response.text);
      expect(parsed.length).toBe(0);
    } else {
      expect(parsedToken).toContain('This should indicate failure');
    }
  });

  it('gets the /api/users/:userId/orders?status=complete endpoint', async () => {
    if (parsedToken !== '') {
      const response = await request(app)
        .get('/api/users/1/orders?status=complete')
        .set('Authorization', `Bearer ${parsedToken}`);
      const parsed = JSON.parse(response.text);
      expect(parsed.length).toBe(0);
    } else {
      expect(parsedToken).toContain('This should indicate failure');
    }
  });
});

describe('Test product routes', () => {
  it('gets the /api/products endpoint', async () => {
    const response = await request(app).get('/api/products');
    const parsed = JSON.parse(response.text);
    // expecting 8 OR 9 depending on order of test runs
    expect(parsed.length).toBeGreaterThanOrEqual(8);
  });

  it('gets the /api/products/:id endpoint', async () => {
    const response = await request(app).get('/api/products/1');
    const parsed = JSON.parse(response.text);
    expect(Object.keys(parsed)).toContain('description');
  });

  it('gets the /api/products/category/:categoryId endpoint', async () => {
    const response = await request(app).get('/api/products/category/2');
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
    expect(response.text).toContain('Hello World!');
  });

  it('gets the /api/ route without token', async () => {
    const response = await request(app).get('/api');
    expect(response.text).toContain('Try going to a different URL');
  });
});
