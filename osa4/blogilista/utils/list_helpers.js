const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return [...blogs].sort((a, b) => (a.likes < b.likes ? 1 : -1))[0];
};

// Horrible
const mostBlogs = (blogs) => {
  const uniqueAuthors = new Set(blogs.map((blog) => blog.author));
  const authorAndBlogs = [...uniqueAuthors].map((author) =>
    blogs.filter((blog) => blog.author === author)
  );
  const bestBlogger = [...authorAndBlogs].sort((a, b) =>
    a.length < b.length ? 1 : -1
  )[0];

  return { author: bestBlogger[0].author, blogs: bestBlogger.length };
};

// Horrible
const mostLikes = (blogs) => {
  const uniqueAuthors = new Set(blogs.map((blog) => blog.author));
  const authorAndBlogs = [...uniqueAuthors].map((author) =>
    blogs.filter((blog) => blog.author === author)
  );

  const totalLikesPerAuthor = authorAndBlogs.map((author) => {
    return {
      author: author[0].author,
      likes: author.reduce((sum, blog) => sum + blog.likes, 0),
    };
  });

  return totalLikesPerAuthor.sort((a, b) => (a.likes < b.likes ? 1 : -1))[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
