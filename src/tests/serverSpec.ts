import request from 'supertest';
import { app } from '../server';

describe('Test routes and endpoints', () => {
  it('gets the root route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('gets the /api route', async () => {
    const response = await request(app).get('/api');
    expect(response.text).toContain('Try going to a different URL');
  });

  it('gets the /api/users endpoint', async () => {
    const response = await request(app).get('/api/users');
    expect(response.text).toContain('no such file or directory');
  });

  it('gets the /api/categories endpoint', async () => {
    const response = await request(app).get(
      '/api/categories/',
    );
    expect(response.text).toContain('no such file or directory');
  });

});
