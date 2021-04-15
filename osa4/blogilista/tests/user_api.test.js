const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

describe('has users to begin with', () => {
  beforeEach(async () => {
    await User.deleteMany({ username: 'sepporäty' });

    // Ran the addition of users only once so test db had hashed passwords
    // Otherwise the id's would change each time

    // helper.initialUsers.forEach(async (user) => {
    //   await api.post('/api/users').send(user);
    // });
  });

  test('returns all users', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });

  describe('adding users', () => {
    test('succeeds with status code 200 when data is valid', async () => {
      const newUser = {
        username: 'sepporäty',
        name: 'Seppo Räty',
        password: 'sauna',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);
    });

    test('fails with status code 400 when password is too short', async () => {
      const newUser = {
        username: 'sepporäty',
        name: 'Seppo Räty',
        password: 's',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain(
        'password must be minimum 3 character long'
      );

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
    });

    test('fails with status code 400 when username is too short', async () => {
      const newUser = {
        username: 's',
        name: 'Seppo Räty',
        password: 'sauna',
      };

      const result = await api.post('/api/users').send(newUser).expect(400);

      expect(result.body.error).toContain(
        '`username` (`s`) is shorter than the minimum allowed length (3)'
      );

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
