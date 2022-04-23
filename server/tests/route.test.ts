/* eslint-disable no-undef */
import request from 'supertest';
import connection from '../database/config/connection';
import app from '../app';

console.log(process.env.TEST_DB_URL);
afterAll(() => {
  connection.close();
});

describe('POST/login', () => {
  test('', () => {
    request(app).post('/login').send({
      email: 'mohammed@gmail.com',
      password: '$2a$10$zak/42j/GpDReRtzYC/iEef.ZR6HRJPNy0yvUxn54632Ekhr9Q7se',
    });
  });
});
