const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    author: 'Michael Chan',
    id: '60757126aea8954b34109f8a',
    likes: 7,
    title: 'React patterns',
    url: 'https://reactpatterns.com/',
    user: '6077f4130397c238a83b0506', // id for petri1807 in blogilista-test/users
  },
  {
    author: 'Edsger W. Dijkstra',
    id: '60757126aea8954b34109f8b',
    likes: 5,
    title: 'Go To Statement Considered Harmful',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: '6077f4130397c238a83b0506', // id for petri1807 in blogilista-test/users
  },
  {
    author: 'Edsger W. Dijkstra',
    id: '60757126aea8954b34109f8c',
    likes: 12,
    title: 'Canonical string reduction',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: '6077f4130397c238a83b0506', // id for petri1807 in blogilista-test/users
  },
  {
    author: 'Robert C. Martin',
    id: '60757126aea8954b34109f8d',
    likes: 10,
    title: 'First class tests',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    user: '6077f4130397c238a83b0506', // id for petri1807 in blogilista-test/users
  },
  {
    author: 'Robert C. Martin',
    id: '60757126aea8954b34109f8e',
    likes: 0,
    title: 'TDD harms architecture',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    user: '6077f4130397c238a83b0506', // id for petri1807 in blogilista-test/users
  },
  {
    author: 'Robert C. Martin',
    id: '60757126aea8954b34109f8f',
    likes: 2,
    title: 'Type wars',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: '6077f4130397c238a83b0506', // id for petri1807 in blogilista-test/users
  },
];

const initialUsers = [
  {
    username: 'petri1807',
    name: 'Petri Lindholm',
    password: 'salasana',
  },
  {
    username: 'satanist666',
    name: 'Bertram Gilfoyle',
    password: 'dineshatemylunch',
  },
  {
    username: 'themanfrompakistan',
    name: 'Dinesh Chugtai',
    password: 'ilovetesla',
  },
  {
    username: 'bitchard',
    name: 'Richard Hendricks',
    password: 'middleout',
  },
  {
    username: 'jared',
    name: 'Donald Dunn',
    password: 'gwent',
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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
