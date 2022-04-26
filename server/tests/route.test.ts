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
    expect(
      response.headers['set-cookie'],
    ).toEqual(undefined);
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
        name: 'mohaammed3',
        email: 'mohammed3@gmail.com',
        password: '123456789',
        address: 'Gaza',
        phone: '05995266300',
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
describe('Get/logout', () => {
  test('logout', async () => {
    const response = await request(app)
      .post('/api/logout')
      .expect(200)
      .expect('set-cookie', 'ACCESS_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    expect(response.body.message).toBe('logged out successfully!');
  });
});
describe('GET/campaines', () => {
  test('get all campaines', async () => {
    const response = await request(app).get('/api/campaigns').expect(200);

    expect(response.body.data.length).toBe(10);
  });
  test('get campaines with name Helping poor families', async () => {
    const response = await request(app).get('/api/campaigns?search=Helping poor families').expect(200);
    expect(response.body.message).toBe('Success');
  });
  test('get campaines with name not exit', async () => {
    const response = await request(app).get('/api/campaigns?search=give people maney').expect(200);
    expect(response.body.data).toEqual([]);
  });
  test('get campaines with category Health', async () => {
    const response = await request(app).get('/api/campaigns?category=Health').expect(200);
    expect(response.body.message).toBe('Success');
  });
  test('get campaines with name not exit', async () => {
    const response = await request(app).get('/api/campaigns?category=food');
    expect(response.body.data).toEqual([]);
  });
  test('get campaines with is available', async () => {
    const response = await request(app).get('/api/campaigns?available=true').expect(200);
    expect(response.body.message).toBe('Success');
  });
  test('get campaines with is not available', async () => {
    const response = await request(app).get('/api/campaigns?available=false').expect(200);
    expect(response.body.data).toEqual([]);
  });
  test('get campaines with limit 6', async () => {
    const response = await request(app).get('/api/campaigns?limit=6').expect(200);
    expect(response.body.data.length).toBe(6);
  });
  test('get error whene  string to page', async () => {
    const response = await request(app).get('/api/campaigns?page="f').expect(400);
    expect(response.body.message).toBe('"page" must be a number');
  });
  test('get error when limit is string', async () => {
    const response = await request(app).get('/api/campaigns?limit=f').expect(400);
    expect(response.body.message).toBe('"limit" must be a number');
  });
  test('get campaines with name summer clothes collection and category=Health', async () => {
    const response = await request(app).get('/api/campaigns?search=summer%20clothes%20collection&category=Education').expect(200);
    expect(response.body.data).toEqual([{
      id: 3,
      title: 'summer clothes collection',
      description: 'This campaign aims to help poor families secure summer clothes by collecting clothes from donors or buying new clothes with financial donations',
      target: 3000,
      image_link: 'http://www.humanitygate.com/thumb/560x292/uploads//images/88e62e08915b10584950106f496140ca.jpg',
      is_available: true,
      categoryId: 2,
      category: {
        name: 'Education',
        icon_url: 'https://i.pinimg.com/564x/dd/9d/c9/dd9dc9d83423bc037b511d73b29e6b80.jpg',
      },
    }]);
  });
  test('get three campaines with catergory education and available ', async () => {
    const response = await request(app).get('/api/campaigns?category=Education&avilable=ture&limit=3').expect(200);
    expect(response.body.data[0].category.name).toBe('Education');
    expect(response.body.data.length).toBe(3);
  });
  test('test pagenation get the three campaines page 1', async () => {
    const response = await request(app).get('/api/campaigns?page=1&limit=3', () => {
      expect(response).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: 10 }),
        expect.objectContaining({ id: 9 }),
        expect.objectContaining({ id: 8 }),
      ]));
    });
  });

  test('test pagenation get the three campaines page 2', async () => {
    const response = await request(app).get('/api/campaigns?page=2&limit=3', () => {
      expect(response).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: 7 }),
        expect.objectContaining({ id: 6 }),
        expect.objectContaining({ id: 5 }),
      ]));
    });
  });
  test('test pagenation get the three campaines page 3', async () => {
    const response = await request(app).get('/api/campaigns?page=3&limit=3', () => {
      expect(response).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: 4 }),
        expect.objectContaining({ id: 3 }),
        expect.objectContaining({ id: 2 }),
      ]));
    });
  });
});

afterAll(() => {
  connection.close();
});
