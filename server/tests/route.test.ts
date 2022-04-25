/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import request from 'supertest';
import connection from '../database/config/connection';
import app from '../app';
import buildFakeData from '../database/fakeData/buildFakeData';

beforeAll(() => buildFakeData());

describe('POST/login', () => {
  test('User with admin role', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'admin@gmail.com',
        password: '123456789',
      })
      .expect(200);
    expect(response.body.data.isAdmin).toEqual(true);
    expect(response.body.data.name).toEqual('admin');
    expect(response.body.data.hasOwnProperty('id')).toEqual(true);
    expect(response.body.message).toBe('Successfully logged in');
    expect(
      response.headers['set-cookie'][0].startsWith('ACCESS_TOKEN'),
    ).toEqual(true);
  });

  test('User without admin role (Normal User)', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'hosam@gmail.com',
        password: '123456789',
      })
      .expect(200);
    expect(response.body.data.hasOwnProperty('id')).toEqual(true);
    expect(response.body.data.isAdmin).toEqual(false);
    expect(response.body.message).toBe('Successfully logged in');
    expect(
      response.headers['set-cookie'][0].startsWith('ACCESS_TOKEN'),
    ).toEqual(true);
  });

  test('User with not valid email', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'hosam@gmail.co',
        password: '12345678',
      })
      .expect(400);
    expect(response.body.message).toBe('"email" must be a valid email');
    expect(response.headers['set-cookie']).toEqual(undefined);
  });

  test('User with not valid password', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'hosam@gmail.com',
        password: '12',
      })
      .expect(400);
    expect(response.body.message).toBe(
      '"password" length must be at least 3 characters long',
    );
  });

  test('Required email', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        password: '123456789',
      })
      .expect(400);
    expect(response.body.message).toBe('"email" is required');
  });

  test('Required password', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'hosam@gmail.com',
      })
      .expect(400);
    expect(response.body.message).toBe('"password" is required');
  });

  test('User with incorrect password', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'hosam@gmail.com',
        password: '123456',
      })
      .expect(400);
    expect(response.body.message).toBe('Incorrect password, please try again');
  });

  test('User with incorrect email', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'hosa@gmail.com',
        password: '123456789',
      })
      .expect(400);
    expect(response.body.message).toBe(
      "Email doesn't exists, Try another one or sign up",
    );
  });
});

describe('POST/signUp', () => {
  test('sign up', async () => {
    const response = await request(app)
      .post('/api/signUp')
      .send({
        name: 'mohammed',
        email: 'mohaammed@gmail.com',
        password: '123456789',
        address: 'Gaza',
        phone: '0599522660',
      })
      .expect(201);
    expect(response.body.message).toBe('Sign up successfully');
    expect(
      response.headers['set-cookie'][0].startsWith('ACCESS_TOKEN'),
    ).toEqual(true);
  });
  test('Email is used', async () => {
    const response = await request(app)
      .post('/api/signUp')
      .send({
        name: 'Ahmed',
        email: 'Ahmed@gmail.com',
        password: '123456789',
        address: 'Gaza',
        phone: '0599821345',
      })
      .expect(400);
    expect(response.body.message).toBe('Email is used try another one');
  });
  test('phone is used', async () => {
    const response = await request(app)
      .post('/api/signUp')
      .send({
        name: 'Ahmed',
        email: 'Ahmed1@gmail.com',
        password: '123456789',
        address: 'Gaza',
        phone: '0599883610',
      })
      .expect(400);
    expect(response.body.message).toBe('phone is used try another one');
  });
});
describe('POST /logout', () => {
  test('logout', async () => {
    const response = await request(app)
      .post('/api/logout')
      .expect(200)
      .expect(
        'set-cookie',
        'ACCESS_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      );
    expect(response.body.message).toBe('logged out successfully!');
  });
});

describe('GET/categories', () => {
  test('get all categories from database', async () => {
    const response = await request(app).get('/api/categories').expect(200);
    expect(response.body.hasOwnProperty('data')).toEqual(true);
  });
});

afterAll(() => {
  connection.close();
});
