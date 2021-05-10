import React from 'react';
import { Blog } from './Blog';
import { useSelector } from 'react-redux';

/**
 * @param user current logged in user
 */
export const Blogs = ({ user }) => {
  const redux_blogs = useSelector((state) => state.blogs);
  const sortedBlogs = redux_blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

  return (
    <div className="blogTable">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};
