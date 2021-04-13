const Blog = require('../models/blog');

const initialBlogs = [
  {
    author: 'Michael Chan',
    id: '60757126aea8954b34109f8a',
    likes: 7,
    title: 'React patterns',
    url: 'https://reactpatterns.com/',
  },
  {
    author: 'Edsger W. Dijkstra',
    id: '60757126aea8954b34109f8b',
    likes: 5,
    title: 'Go To Statement Considered Harmful',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  },
  {
    author: 'Edsger W. Dijkstra',
    id: '60757126aea8954b34109f8c',
    likes: 12,
    title: 'Canonical string reduction',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  },
  {
    author: 'Robert C. Martin',
    id: '60757126aea8954b34109f8d',
    likes: 10,
    title: 'First class tests',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  },
  {
    author: 'Robert C. Martin',
    id: '60757126aea8954b34109f8e',
    likes: 0,
    title: 'TDD harms architecture',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  },
  {
    author: 'Robert C. Martin',
    id: '60757126aea8954b34109f8f',
    likes: 2,
    title: 'Type wars',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'johndoe',
    url: 'http://none.com',
    likes: 0,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
