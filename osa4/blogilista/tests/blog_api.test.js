const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

describe('has blogs to begin with', () => {
  let token;

  beforeAll(async () => {
    const response = await api.post('/api/login').send({
      username: 'petri1807',
      password: 'salasana',
    });

    // Needs bearer added as middleware handles the request.token & request.user thing
    token = `bearer ${response.body.token}`;
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  describe('returns in correct format', () => {
    test('blogs as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('blog parameter id is defined', async () => {
      const response = await api.get('/api/blogs');
      const id = response.body[0].id;
      expect(id).toBeDefined();
    });
  });

  describe('adding a blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Full Stack Open 2021',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/',
        likes: 8,
        userId: '6077f4130397c238a83b0506', // id for petri1807
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map((b) => b.title);
      expect(contents).toContain('Full Stack Open 2021');
    });

    test('if likes is omitted it will default to value 0', async () => {
      const newBlog = {
        title: 'Full Stack Open 2021',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/',
        userId: '6077f4130397c238a83b0506', // id for petri1807
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map((b) => b.likes);
      expect(contents).not.toContain(undefined);
      expect(contents.pop()).toBe(0);
    });

    test('if title or url are omitted it will respond with 400 Bad request', async () => {
      const newBlog = {
        author: 'Matti Luukkainen',
        likes: 7,
        userId: '6077f4130397c238a83b0506', // id for petri1807
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token })
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe('modifying a blog', () => {
    test('liking a blog increases the like value', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToModify = blogsAtStart[0];
      blogToModify.likes = blogToModify.likes + 1;

      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(blogToModify)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const contents = blogsAtEnd.map((b) => b.likes);
      expect(contents[0]).toBe(blogToModify.likes);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with a status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const noteToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${noteToDelete.id}`)
        .set({ Authorization: token })
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const contents = blogsAtEnd.map((b) => b.title);
      expect(contents).not.toContain(noteToDelete.title);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
