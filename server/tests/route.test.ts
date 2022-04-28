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
describe('Get/campaign/:id', () => {
  test('campaign/:id', async () => {
    const id = 1;
    const data = {
      id: 1,
      title: 'Helping poor families',
      description:
        'This campaign helps save an amount of money that guarantees 50 families for two months',
      target: 50000,
      is_available: true,
    };
    const response = await request(app).get(`/api/campaign/${id}`).expect(200);
    expect(response.body.data).toMatchObject(data);
    expect(response.body.message).toBe('Success');
  });

  test('campaign/:id => id dose not exist', async () => {
    const id = 10;
    const response = await request(app).get(`/api/campaign/${id}`).expect(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toBe('There is no campaign');
  });

  test('campaign/:id => id is not a number', async () => {
    const id = 'id';
    const response = await request(app).get(`/api/campaign/${id}`).expect(400);
    expect(response.body.data).toBe(undefined);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('"id" must be a number');
  });
});
describe('Post/reports', () => {
  test('reports', async () => {
    const response = await request(app)
      .post('/api/reports')
      .send({
        name: 'reports',
        email: 'report@gmail.com',
        message: ' any message you want',
      })
      .expect(201);
    expect(response.body.message).toBe('Report sent successfully');
  });
});
describe('GET/categories', () => {
  test('get all categories from database', async () => {
    const response = await request(app).get('/api/categories').expect(200);
    expect(response.body.hasOwnProperty('data')).toEqual(true);
  });
});

describe('POST /donation/:id', () => {
  test('Add donation to database - Unauthorized user', async () => {
    const response = await request(app)
      .post('/api/donation/1')
      .send({
        food: 1,
        description: 'Donation',
        location: 'Test Location',
        deliver_time: '02/02/2020',
      })
      .expect(401);
    expect(response.body.message).toEqual('Unauthorized user');
  });
  test('Add donation to database - Authorized user', async () => {
    const response = await request(app)
      .post('/api/donation/1')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMDkyNzc5LCJleHAiOjE2NTM2ODQ3Nzl9.nrZI3QFlUn16xlm3ByPGBzCS-6YMwbVl7KuzVzRFsco',
      ])
      .send({
        food: 1,
        description: 'Donation',
        location: 'Test Location',
        deliver_time: '02/02/2020',
      })
      .expect(201);
    expect(response.body.message).toEqual('Donation added successfully');
  });
  test('donation with not valid date', async () => {
    const response = await request(app)
      .post('/api/donation/4')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMDkyNzc5LCJleHAiOjE2NTM2ODQ3Nzl9.nrZI3QFlUn16xlm3ByPGBzCS-6YMwbVl7KuzVzRFsco',
      ])
      .send({
        food: 1,
        description: 'Donation',
        location: 'Test Location',
        deliver_time: true,
      })
      .expect(400);
    expect(response.body.message).toEqual(
      '"deliver_time" must be a valid date',
    );
  });
  test('donation with not entered date', async () => {
    const response = await request(app)
      .post('/api/donation/1')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMDkyNzc5LCJleHAiOjE2NTM2ODQ3Nzl9.nrZI3QFlUn16xlm3ByPGBzCS-6YMwbVl7KuzVzRFsco',
      ])
      .send({
        food: 1,
        description: 'Donation',
        location: 'Test Location',
      })
      .expect(400);
    expect(response.body.message).toEqual('"deliver_time" is required');
  });
  test('campaign id not exists', async () => {
    const response = await request(app)
      .post('/api/donation/10')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMDkyNzc5LCJleHAiOjE2NTM2ODQ3Nzl9.nrZI3QFlUn16xlm3ByPGBzCS-6YMwbVl7KuzVzRFsco',
      ])
      .send({
        food: 1,
        description: 'Donation',
        location: 'Test Location',
        deliver_time: '02/02/2020',
      })
      .expect(400);
    expect(response.body.message).toEqual(
      'Cannot add donation, campaign not exists',
    );
  });
});

describe('GET /statistics', () => {
  test('get all stats', async () => {
    const response = await request(app).get('/api/statistics').expect(200);
    const { data } = response.body;
    expect(data).toStrictEqual({
      families: 5,
      doners: 5,
      donations: [
        {
          money: '1000',
          food: '101',
          clothes: '100',
        },
      ],
    });
  });
});

afterAll(() => {
  connection.close();
});
