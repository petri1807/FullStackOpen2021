import React from 'react';
import { Blog } from './Blog';
import { useSelector } from 'react-redux';

/**
 * @param likeHandler call like handler
 * @param removeHandler call remove handler
 * @param user current logged in user
 */
export const Blogs = ({ likeHandler, removeHandler, user }) => {
  const redux_blogs = useSelector((state) => state.blogs);
  const sortedBlogs = redux_blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

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
