/* eslint-disable comma-spacing */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import request from 'supertest';
import connection from '../database/config/connection';
import app from '../app';
import buildFakeData from '../database/fakeData/buildFakeData';
import * as campaigns from './getAllCampaignsResult.json';

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
      '"password" length must be at least 6 characters long',
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
      .post('/api/signup')
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
      .post('/api/signup')
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
      .post('/api/signup')
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
      campaignInfo: {
        category: {
          icon_url:
            'https://i.pinimg.com/564x/dd/9d/c9/dd9dc9d83423bc037b511d73b29e6b80.jpg',
          name: 'Health',
        },
        description:
          'This campaign helps save an amount of money that guarantees 50 families for two months',
        id: 1,
        image_link:
          'https://media.voltron.alhurra.com/Drupal/01live-116/styles/sourced/s3/2019-12/AFC8DF4B-8C6D-4968-87B2-CEAFD63DED97.jpg?itok=Y3YypJNm',
        is_available: true,
        food_target: 1000,
        clothes_target: 200,
        money_target: 2000,
        title: 'Helping poor families',
      },
      current: {
        current: 120,
        current_clothes: 10,
        current_food: 10,
        current_money: 100,
      },
      families: 1,
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
    const {
      body: { data },
    } = await request(app).get('/api/statistics').expect(200);
    expect(data).toEqual({
      FAMILIES: 5,
      MONEY: '1000',
      FOODS: '101',
      CLOTHES: '100',
    });
  });
});

describe('GET/checkAuth', () => {
  test('Authorized', async () => {
    const response = await request(app)
      .get('/api/checkAuth')
      .set('Cookie', [
        ' ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImF5YSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTEyNTA2MDAsImV4cCI6MTY1Mzg0MjYwMH0.C6_G19oENCkS2B47LdWZqvNDEFgPj3IsykSFOfBY48I',
      ])
      .expect(200);
    expect(response.body.data).toEqual({
      exp: 1653842600,
      iat: 1651250600,
      id: 7,
      isAdmin: false,
      name: 'aya',
    });
  });
  test('unAuthorized uer ', async () => {
    await request(app)
      .get('/api/checkAuth')
      .set('Cookie', [
        ' ACCESS_TOKEN=666eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImF5YSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTEyNTA2MDAsImV4cCI6MTY1Mzg0MjYwMH0.C6_G19oENCkS2B47LdWZqvNDEFgPj3IsykSFOfBY48I',
      ])
      .expect(401);
  });
  test('test in there is not ACCESS_TOKEN ', async () => {
    await request(app).get('/api/checkAuth').set('Cookie', []).expect(401);
  });
});

describe('GET /campaigns', () => {
  test('get all campaigns', async () => {
    const response = await request(app).get('/api/campaigns').expect(200);

    expect(response.body.data.campaigns[0]).toEqual(campaigns[0]);
  });
  test('test pagination get the three campaigns page 1', async () => {
    const response = await request(app).get(
      '/api/campaigns?page=1&limit=3',
      () => {
        expect(response).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ id: 5 }),
            expect.objectContaining({ id: 4 }),
            expect.objectContaining({ id: 3 }),
          ]),
        );
      },
    );
  });
  test('get error when  string to page', async () => {
    const response = await request(app)
      .get('/api/campaigns?page="f')
      .expect(400);
    expect(response.body.message).toBe('"page" must be a number');
  });
  test('get error when limit is string', async () => {
    const response = await request(app)
      .get('/api/campaigns?limit=f')
      .expect(400);
    expect(response.body.message).toBe('"limit" must be a number');
  });
  test('get campaigns with is not available', async () => {
    const response = await request(app)
      .get('/api/campaigns?available=false')
      .expect(200);
    expect(response.body.data.campaigns).toEqual([]);
  });
  test('get campaigns with name Summer and category=education', async () => {
    const response = await request(app)
      .get(
        '/api/campaigns?search=summer%20clothes%20collection&category=Education',
      )
      .expect(200);
    expect(response.body.data.campaigns).toEqual([
      {
        id: 3,
        title: 'summer clothes collection',
        description:
          'This campaign aims to help poor families secure summer clothes by collecting clothes from donors or buying new clothes with financial donations',
        image_link:
          'http://www.humanitygate.com/thumb/560x292/uploads//images/88e62e08915b10584950106f496140ca.jpg',
        is_available: true,
        categoryId: 2,
        category: {
          name: 'Education',
          icon_url:
            'https://i.pinimg.com/564x/dd/9d/c9/dd9dc9d83423bc037b511d73b29e6b80.jpg',
        },
      },
    ]);
  });
  test('get campaigns with name not exit', async () => {
    const response = await request(app)
      .get('/api/campaigns?search=give people money&category=Education')
      .expect(200);
    expect(response.body.data.campaigns).toEqual([]);
  });

  describe('GET /api/admin/families', () => {
    test('Unauthorized user admin', async () => {
      const response = await request(app)
        .get('/api/admin/families')
        .expect(401);

      expect(response.body.message).toEqual('Unauthorized user');
    });
    test('/?page validation error', async () => {
      const response = await request(app)
        .get('/api/admin/families/?page=string')
        .set('Cookie', ['ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMjA5NTI0LCJleHAiOjE2NTQ4MDE1MjR9.LD0qUzAD_IdLqqkSrWPfs2JsBjruMIHgX06KUsIXEyY;'])
        .expect(401);
      expect(response.body.message).toEqual('"page" must be a number');
    });

    test('first page families', async () => {
      const { body: { data: { families, count } } } = await request(app)
        .get('/api/admin/families/?page=1')
        .set('Cookie', ['ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMjA5NTI0LCJleHAiOjE2NTQ4MDE1MjR9.LD0qUzAD_IdLqqkSrWPfs2JsBjruMIHgX06KUsIXEyY;'])
        .expect(200);
      expect(families.length).toEqual(5);
      expect(count).toEqual(5);
      expect(families[0]).toEqual({
        id: 5,
        name: 'Ghazi',
        phone: '0597086162',
        address: 'Al Zahra',
        clothes: null,
        money: null,
        food: null,
      });
    });
  });
});

describe('PATCH /api/admin/family', () => {
  test('case: succeeded | updated successfully', async () => {
    const id = 1;
    const response = await request(app)
      .patch(`/api/admin/family/${id}`)
      .send({
        name: 'mohammed',
        phone: '0599522660',
        address: 'Gaza',
      }).set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(200);
    expect(response.body.message).toBe('updated successfully');
  });
  test('case: Failed | updated successfully', async () => {
    const id = 1;
    const response = await request(app)
      .patch(`/api/admin/family/${id}`)
      .send({
        name: 'mohammed',
        phone: '0597086162',
        address: 'Gaza',
      }).set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(400);
    expect(response.body.message).toBe('Phone is used');
  });
  test('case: Failed | updated Failed', async () => {
    const id = 111;
    const response = await request(app)
      .patch(`/api/admin/family/${id}`)
      .send({
        name: 'Marwani',
        phone: '0599888620',
        address: 'Gaza al remal street',
      }).set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(400);
    expect(response.body.message).toBe('updated Failed');
  });
  test('case: Failed | Unauthorized user', async () => {
    const id = 1;
    const response = await request(app)
      .patch(`/api/admin/family/${id}`)
      .send({
        name: 'Marwani',
        phone: '0599888620',
        address: 'Gaza al remal street',
      }).expect(401);
    expect(response.body.message).toBe('Unauthorized user');
  });
});

describe('POST /api/admin/family', () => {
  test('case: succeeded | added successfully', async () => {
    const response = await request(app)
      .post('/api/admin/family')
      .send({
        name: 'mohammed',
        phone: '0599522669',
        address: 'Gaza',
      }).set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(201);
    expect(response.body.message).toBe('Family added successfully');
  });
  test('case: Failed | phone is used', async () => {
    const response = await request(app)
      .post('/api/admin/family')
      .send({
        name: 'mohammed',
        phone: '0597801162',
        address: 'Gaza',
      }).set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(400);
    expect(response.body.message).toBe('Phone is used, Try another one.');
  });
  test('case: Failed | "address" does not exist', async () => {
    const response = await request(app)
      .post('/api/admin/family')
      .send({
        name: 'mohammed',
        phone: '0599888622',
      }).set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(400);
    expect(response.body.message).toBe('"address" is required');
  });
  test('case: Failed | Unauthorized user', async () => {
    const response = await request(app)
      .post('/api/admin/family')
      .send({
        name: 'mohammed',
        phone: '0599888621',
        address: 'Gaza',
      })
      .expect(401);
    expect(response.body.message).toBe('Unauthorized user');
  });
});

describe('GET /admin/campaigns?page=<number>', () => {
  test('Get all reports  <Unauthorized user>', async () => {
    const response = await request(app).get('/api/admin/campaigns').expect(401);
    expect(response.body.message).toEqual('Unauthorized user');
  });
  test('Get all reports  <Unauthorized admin>', async () => {
    const response = await request(app)
      .get('/api/admin/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFobWVkIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1MTk5OTY3OSwiZXhwIjoxNjU0NTkxNjc5fQ.Z0Tq0XxGNbQ72J4BRAp06Qo6xYq41jb59-5uRK1JfuA',
      ])
      .expect(401);
    expect(response.body.message).toEqual('Unauthorized admin');
  });
  test('Get all reports  <Authorized admin> <page 1>', async () => {
    const response = await request(app)
      .get('/api/admin/campaigns?page=1')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(200);
    expect(response.body.data.campaigns.length).toEqual(5);
    expect(response.body.data.count).toEqual(5);
  });
  test('Get all reports  <Authorized admin> <page 2>', async () => {
    const response = await request(app)
      .get('/api/admin/campaigns?page=2')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(200);
    expect(response.body.data.campaigns.length).toEqual(0);
    expect(response.body.data.count).toEqual(5);
  });
  test('Get all reports  <Authorized admin> <not valid page>', async () => {
    const response = await request(app)
      .get('/api/admin/campaigns?page=a')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(401);
    expect(response.body.message).toBe('"page" must be a number');
  });
});

describe('GET /admin/reports', () => {
  test('Get all reports  <Unauthorized user>', async () => {
    const response = await request(app).get('/api/admin/reports').expect(401);
    expect(response.body.message).toEqual('Unauthorized user');
  });
  test('Get all reports  <Unauthorized admin>', async () => {
    const response = await request(app)
      .get('/api/admin/reports')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFobWVkIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1MTk5OTY3OSwiZXhwIjoxNjU0NTkxNjc5fQ.Z0Tq0XxGNbQ72J4BRAp06Qo6xYq41jb59-5uRK1JfuA',
      ])
      .expect(401);
    expect(response.body.message).toEqual('Unauthorized admin');
  });
  test('Get all reports  <Authorized admin> <page 1>', async () => {
    const response = await request(app)
      .get('/api/admin/reports?page=1')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(200);
    expect(response.body.data.reports.length).toEqual(5);
    expect(response.body.data.count).toEqual(5);
  });
  test('Get all reports  <Authorized admin> <page 2>', async () => {
    const response = await request(app)
      .get('/api/admin/reports?page=2')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(200);
    expect(response.body.data.reports.length).toEqual(0);
    expect(response.body.data.count).toEqual(5);
  });
  test('Get all reports  <Authorized admin> <not valid page>', async () => {
    const response = await request(app)
      .get('/api/admin/reports?page=a')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(401);
    expect(response.body.message).toBe('"page" must be a number');
  });
});

describe('DELETE /api/admin/family/:id', () => {
  test('Delete family <Unauthorized user>', async () => {
    const response = await request(app)
      .delete('/api/admin/family/1')
      .expect(401);
    expect(response.body.message).toEqual('Unauthorized user');
  });
  test('Delete family <Unauthorized admin>', async () => {
    const response = await request(app)
      .delete('/api/admin/family/1')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFobWVkIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1MjExOTI4OSwiZXhwIjoxNjU0NzExMjg5fQ.WNuAaN7EcIrUx7RV2EMj_E46vbRP4FU5e8vsjMcwCpY',
      ])
      .expect(401);
    expect(response.body.message).toEqual('Unauthorized admin');
  });
  test('Delete family <Authorized admin> <Family exists>', async () => {
    const response = await request(app)
      .delete('/api/admin/family/1')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ])
      .expect(200);
    expect(response.body.message).toEqual('Family deleted successfully');
  });
  test('Delete family <Authorized admin> <Family exists>', async () => {
    const response = await request(app)
      .delete('/api/admin/family/10')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ])
      .expect(400);
    expect(response.body.message).toEqual(
      'The family you are trying to delete does not exist',
    );
  });
  test('Delete family <Authorized admin> <Not valid id param>', async () => {
    const response = await request(app)
      .delete('/api/admin/family/gd')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ])
      .expect(400);
    expect(response.body.message).toEqual('"id" must be a number');
  });
});

describe('DELETE /api/admin/donor/:donorId', () => {
  test('case: succeeded | Deleted successfully', async () => {
    const donorId = 2;
    const response = await request(app)
      .delete(`/api/admin/donor/${donorId}`)
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(200);
    expect(response.body.message).toBe('Donor deleted successfully');
  });

  test('case: Failed | id does not exist', async () => {
    const donorId = 10;
    const response = await request(app)
      .delete(`/api/admin/donor/${donorId}`)
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(400);
    expect(response.body.message).toBe('The donor you are trying to delete does not exist');
  });
  test('case: Failed | id is not a number', async () => {
    const donorId = 'w';
    const response = await request(app)
      .delete(`/api/admin/donor/${donorId}`)
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(400);
    expect(response.body.message).toBe('"id" must be a number');
  });
  test('case: Failed | Unauthorized user', async () => {
    const donorId = 2;
    const response = await request(app)
      .delete(`/api/admin/donor/${donorId}`)
      .expect(401);
    expect(response.body.message).toBe('Unauthorized user');
  });
});
describe('GET /api/families/campaigns/:id', () => {
  test('unauthorized admin', async () => {
    const response = await request(app)
      .get('/api/admin/family/1/campaigns');
    expect(400);
    expect(response.body.message).toBe('Unauthorized user');
  });
  test('params id must be number', async () => {
    const response = await request(app)
      .get('/api/admin/family/string/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ]);
    expect(400);
    expect(response.body.message).toBe('"id" must be a number');
  });
  test('family doesnt exist', async () => {
    const response = await request(app)
      .get('/api/admin/family/500/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ]);
    expect(400);
    expect(response.body.data).toEqual([]);
  });
  test('get family campaigns', async () => {
    const response = await request(app)
      .get('/api/admin/family/4/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ]);
    expect(response.body).toEqual({
      message: 'Success',
      data: [
        {
          id: 3,
          title: 'summer clothes collection',
        },
      ],
    });
  });
});
describe('/GET/api/admin/donors', () => {
  test('get donors', async () => {
    const response = await request(app)
      .get('/api/admin/donors')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(200);
    expect(response.body.data.donors).toEqual([

      {
        id: 5,
        name: 'mohammed',
        email: 'mohaammed@gmail.com',
        address: 'Gaza',
        phone: '0599522660',
        totalFood: null,
        totalMoney: null,
        totalClothes: null,
      },
      {
        id: 4,
        name: 'sami',
        email: 'sami@gmail.com',
        address: 'Gaza',
        phone: '0599848610',
        totalFood: '40',
        totalMoney: '400',
        totalClothes: '40',
      },
      {
        id: 3,
        name: 'hosam',
        email: 'hosam@gmail.com',
        address: 'Gaza',
        phone: '0597988610',
        totalFood: '30',
        totalMoney: '300',
        totalClothes: '30',
      },
      {
        id: 1,
        name: 'admin',
        email: 'admin@gmail.com',
        address: 'Gaza',
        phone: '0599888611',
        totalFood: '31',
        totalMoney: '300',
        totalClothes: '30',
      },
    ]);
  });
  test('get donors with limit and page', async () => {
    const response = await request(app)
      .get('/api/admin/donors?limit=1&page=2')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(200);
    expect(response.body.data.donors)
      .toEqual([{
        id: 4,
        name: 'sami',
        email: 'sami@gmail.com',
        address: 'Gaza',
        phone: '0599848610',
        totalFood: '40',
        totalMoney: '400',
        totalClothes: '40',
      }]);
  });
  test('get donors with limit and page', async () => {
    const response = await request(app)
      .get('/api/admin/donors?limit=f&page=2')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .expect(400);
    expect(response.body.message).toBe('"limit" must be a number');
  });
  test('get donors with limit and page', async () => {
    const response = await request(app)
      .get('/api/admin/donors?limit=1&page=2')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFobWVkIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1MTk5OTY3OSwiZXhwIjoxNjU0NTkxNjc5fQ.Z0Tq0XxGNbQ72J4BRAp06Qo6xYq41jb59-5uRK1JfuA',
      ])
      .expect(401);
    expect(response.body.message).toBe('Unauthorized admin');
  });
});
describe('PATCH /api/admin/donor/:id', () => {
  test('success update donor', async () => {
    const response = await request(app)
      .patch('/api/admin/donor/5')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ])
      .send({
        name: 'new name',
        phone: '059999999',
      })
      .expect(200);
    expect(response.body.message).toEqual('Donor updated successfully');
  });
  test('failed updating donor', async () => {
    const response = await request(app)
      .patch('/api/admin/donor/2')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ])
      .expect(400);
    expect(response.body.message).toEqual('Update donor failed');
  });
  test('id must be a number', async () => {
    const response = await request(app)
      .patch('/api/admin/donor/string')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ])
      .expect(400);
    expect(response.body.message).toEqual('"id" must be a number');
  });
  test('Unauthorized user', async () => {
    const response = await request(app)
      .patch('/api/admin/donor/string')
      .expect(401);
    expect(response.body.message).toBe('Unauthorized user');
  });
});
describe('GET/admin/donor/campaigns/:id', () => {
  test('get campaigns for donor that have id 1', async () => {
    const response = await request(app).get('/api/admin/donor/1/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ]);
    expect(200);
    expect(response.body.data.campaigns).toEqual([
      {
        id: 1,
        title: 'Helping poor families',
      },
      {
        id: 2,
        title: 'winter clothes collection',

      },
    ]);
  });
  test('get campaings for donor id not exist', async () => {
    const response = await request(app).get('/api/admin/donor/20/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ]);
    expect(400);
    expect(response.body.message).toBe('There is no donor');
  });

  test('get campaings for Authorized user', async () => {
    const response = await request(app).get('/api/admin/donor/1/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFobWVkIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY1MjExOTI4OSwiZXhwIjoxNjU0NzExMjg5fQ.WNuAaN7EcIrUx7RV2EMj_E46vbRP4FU5e8vsjMcwCpY',
      ]);
    expect(401);
    expect(response.body.message).toBe('Unauthorized admin');
  });
});
describe('POST /api/admin/campaigns', () => {
  test('unauthorized admin', async () => {
    const response = await request(app).post('/api/admin/campaigns')
      .expect(401);
    expect(response.body.message).toBe('Unauthorized user');
  });
  test('missing column categoryId', async () => {
    const response = await request(app).post('/api/admin/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        title: 'campaign title',
        description: 'campaign description',
        food_target: 500,
        clothes_target: 500,
        money_target: 500,
        image_link: 'link to an img',
      })
      .expect(400);
    expect(response.body.message).toBe('"categoryId" is required');
  });
  test('title as number', async () => {
    const response = await request(app).post('/api/admin/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        title: 1,
        description: 'campaign description',
        food_target: 500,
        clothes_target: 500,
        money_target: 500,
        image_link: 'link to an img',
        categoryId: 1,
      })
      .expect(400);
    expect(response.body.message).toBe('"title" must be a string');
  });
  test('add new campaign', async () => {
    const response = await request(app).post('/api/admin/campaigns')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        title: 'campaign title',
        description: 'campaign description',
        food_target: 500,
        clothes_target: 500,
        money_target: 500,
        image_link: 'link to an img',
        categoryId: 1,
      })
      .expect(201);
    expect(response.body.message).toBe('Campaign added successfully');
  });
});

describe('DELETE /api/admin/campaigns/:id', () => {
  test('unauthorized user', async () => {
    const response = await request(app).delete('/api/admin/campaigns/1');
    expect(401);
    expect(response.body.message).toBe('Unauthorized user');
  });
  test('campaign id not a number', async () => {
    const response = await request(app).delete('/api/admin/campaigns/string')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ]);
    expect(400);
    expect(response.body.message).toBe('"id" must be a number');
  });
  test('campaign doesnt exist', async () => {
    const response = await request(app).delete('/api/admin/campaigns/100')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ]);
    expect(400);
    expect(response.body.message).toBe("Campaign doesn't exist");
  });
  test('campaign delete success', async () => {
    const response = await request(app).delete('/api/admin/campaigns/2')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ]);
    expect(201);
    expect(response.body.message).toBe('Campaign deleted successfully');
  });
});
describe('DELETE/admin/reports/id', () => {
  test('delete report that exist', async () => {
    const response = await request(app).delete('/api/admin/report/3')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ]);
    expect(200);
    expect(response.body.message).toBe('Report deleted successfuly');
  });
  test('delete report that does not exist', async () => {
    const response = await request(app).delete('/api/admin/report/9')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ]);
    expect(400);
    expect(response.body.message).toBe('The report does not exist');
  });
});
describe('PATCH/api/admin/campaign/id', () => {
  test('edit campaign exist', async () => {
    const response = await request(app).patch('/api/admin/campaign/3')
      .send({
        title: 'summer clothes collection',
        description: 'This campaign aims to help poor families to heat their homes in the winter by collecting clothes from donors or buying new clothes from financial donations',
        categoryId: 2,
        food_target: 1,
        clothes_target: 800,
        money_target: 1,
        image_link: 'https://media.voltron.alhurra.com/Drupal/01live-116/styles/sourced/s3/2019-12/AFC8DF4B-8C6D-4968-87B2-CEAFD63DED97.jpg?itok=Y3YypJNm',
      }).set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ]);
    expect(200);
    expect(response.body.data.campaign).toEqual({
      title: 'summer clothes collection',
      description: 'This campaign aims to help poor families to heat their homes in the winter by collecting clothes from donors or buying new clothes from financial donations',
      categoryId: 2,
      food_target: 1,
      clothes_target: 800,
      money_target: 1,
      image_link: 'https://media.voltron.alhurra.com/Drupal/01live-116/styles/sourced/s3/2019-12/AFC8DF4B-8C6D-4968-87B2-CEAFD63DED97.jpg?itok=Y3YypJNm',
    });
  });
  test('edit campaign exist not exist', async () => {
    const response = await request(app).patch('/api/admin/campaign/10')
      .send({
        title: 'summer clothes collection',
        description: 'This campaign aims to help poor families to heat their homes in the winter by collecting clothes from donors or buying new clothes from financial donations',
        categoryId: 2,
        food_target: 1,
        clothes_target: 800,
        money_target: 1,
        image_link: 'https://media.voltron.alhurra.com/Drupal/01live-116/styles/sourced/s3/2019-12/AFC8DF4B-8C6D-4968-87B2-CEAFD63DED97.jpg?itok=Y3YypJNm',
      }).set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUyMTIxODI0LCJleHAiOjE2NTQ3MTM4MjR9.Ue8JhWn8jAgLNzUdoHiWZAXoRtF5vooY3itRjw1yjyM',
      ]);

    expect(200);
    expect(response.body.message).toBe('Fail to update');
  });
});
describe('POST api/admin/campagin/:id/families', () => {
  test('case:Fail |campaign id not valid', async () => {
    const response = await request(app)
      .post('/api/admin/campaign/f/families')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        ids: '[1, 2, 3, 4]',
        food: 0,
        money: 0,
        clothes: 0,
      })
      .expect(400);
    expect(response.body.message).toBe('"id" must be a number');
  });
  test('case:Fail |campaign id does not exits ', async () => {
    const response = await request(app)
      .post('/api/admin/campaign/8/families')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        ids: [1, 2, 3, 4],
        food: 0,
        money: 0,
        clothes: 0,
      })
      .expect(400);
    expect(response.body.message).toBe('Campaign does not exits');
  });
  test('case:Fail |ids is not array', async () => {
    const response = await request(app)
      .post('/api/admin/campaign/4/families')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        ids: 'farah',
        food: 0,
        money: 0,
        clothes: 0,
      })
      .expect(400);
    expect(response.body.message).toBe('ids must be array of number');
  });
  test('case:Fail |money is not number', async () => {
    const response = await request(app)
      .post('/api/admin/campaign/5/families')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        ids: '[2,3,4]',
        food: 'f',
        money: 0,
        clothes: 0,
      })
      .expect(400);
    expect(response.body.message).toBe('"food" must be a number');
  });
  test('case:Fail |array item not number', async () => {
    const response = await request(app)
      .post('/api/admin/campaign/4/families')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        ids: ['f', 2, 3, 4],
        food: 1,
        money: 0,
        clothes: 0,
      })
      .expect(400);
    expect(response.body.message).toBe('ids must be array of number');
  });
  test('case:success ', async () => {
    const response = await request(app)
      .post('/api/admin/campaign/4/families')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        ids: '[2,3]',
        food: 1,
        money: 1,
        clothes: 1,
      })
      .expect(200);
    expect(response.body.message).toBe('Families added successfully');
  });
  test('case:fail with close git campaign ', async () => {
    const response = await request(app)
      .post('/api/admin/campaign/4/families')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        ids: '[2,3]',
        food: 1,
        money: 1,
        clothes: 1,
      })
      .expect(400);
    expect(response.body.message).toBe('Campaign has closed');
  });
  test('case:fail families does not exist ', async () => {
    const response = await request(app)
      .post('/api/admin/campaign/5/families')
      .set('Cookie', [
        'ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxOTk4NDgzLCJleHAiOjE2NTQ1OTA0ODN9.LBvMMkPbcTeBMbKBeOQ7sYe1s-Wy5zHjhbjjTtcByFw',
      ])
      .send({
        ids: '[7,2,3]',
        food: 1,
        money: 1,
        clothes: 1,
      })
      .expect(400);
    expect(response.body.message).toBe('Cannot add families');
  });
});
afterAll(() => {
  connection.close();
});
