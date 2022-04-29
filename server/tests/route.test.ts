/* eslint-disable import/extensions */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import request from 'supertest';
import connection from '../database/config/connection';
import app from '../app';
import buildFakeData from '../database/fakeData/buildFakeData';
import * as campaigns from './campaines.json';

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
    const id = 20;
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

describe('GET/campaines', () => {
  test('get all campaines', async () => {
    const response = await request(app).get('/api/campaigns').expect(200);

    expect(response.body.data.campaigns[0]).toEqual(campaigns[0]);
  });
  test('test pagenation get the three campaines page 1', async () => {
    const response = await request(app).get('/api/campaigns?page=1&limit=3', () => {
      expect(response).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: 5 }),
        expect.objectContaining({ id: 4 }),
        expect.objectContaining({ id: 3 }),
      ]));
    });
  });
  test('get error when  string to page', async () => {
    const response = await request(app).get('/api/campaigns?page="f').expect(400);
    expect(response.body.message).toBe('"page" must be a number');
  });
  test('get error when limit is string', async () => {
    const response = await request(app).get('/api/campaigns?limit=f').expect(400);
    expect(response.body.message).toBe('"limit" must be a number');
  });
  test('get campaines with is not available', async () => {
    const response = await request(app).get('/api/campaigns?available=false').expect(200);
    expect(response.body.data.campaigns).toEqual([]);
  });
  test('get campaines with name summer clothes collection and category=education', async () => {
    const response = await request(app).get('/api/campaigns?search=summer%20clothes%20collection&category=Education').expect(200);
    expect(response.body.data.campaigns).toEqual([{
      id: 3,
      title: 'summer clothes collection',
      description: 'This campaign aims to help poor families secure summer clothes by collecting clothes from donors or buying new clothes with financial donations',
      image_link: 'http://www.humanitygate.com/thumb/560x292/uploads//images/88e62e08915b10584950106f496140ca.jpg',
      is_available: true,
      categoryId: 2,
      category: {
        name: 'Education',
        icon_url: 'https://i.pinimg.com/564x/dd/9d/c9/dd9dc9d83423bc037b511d73b29e6b80.jpg',
      },
    }]);
  });
  test('get campaines with name not exit', async () => {
    const response = await request(app).get('/api/campaigns?search=give people maney&category=Education').expect(200);
    expect(response.body.data.campaigns).toEqual([]);
  });
});

afterAll(() => {
  connection.close();
});
