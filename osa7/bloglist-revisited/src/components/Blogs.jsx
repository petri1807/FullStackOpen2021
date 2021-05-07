import React from 'react';
import { Blog } from './Blog';

/**
 * @param blogs Array of blogs
 * @param likeHandler call like handler
 * @param removeHandler call remove handler
 * @param user current logged in user
 */
export const Blogs = ({ blogs, likeHandler, removeHandler, user }) => {
  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

  return (
    <div className="blogTable">
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeHandler={likeHandler}
          removeHandler={removeHandler}
          user={user}
        />
      ))}
    </div>
  );
};
