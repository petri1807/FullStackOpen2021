import React, { useState } from 'react';

/**
 * @param blog individual blog item
 * @param likeHandler call like handler
 * @param removeHandler call remove handler
 * @param user current logged in user
 */
export const Blog = ({ blog, likeHandler, removeHandler, user }) => {
  const [displayInfo, setDisplayInfo] = useState(false);

  const toggleVisibility = () => {
    setDisplayInfo(!displayInfo);
  };

  const handleLike = () => {
    likeHandler(blog);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeHandler(blog);
    }
  };

  if (!displayInfo) {
    return (
      <div className="blogItem">
        <div className="blogTitle">
          <p>{blog.title}</p>
          <p> {blog.author}</p>
          <button id="view" onClick={toggleVisibility}>
            View
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blogItem">
      <div className="blogTitle">
        <p>{blog.title}</p>
        <button id="hide" onClick={toggleVisibility}>
          hide
        </button>
      </div>
      {blog.url}
      <div>
        likes {blog.likes}
        <button id="like" onClick={handleLike}>
          like
        </button>
      </div>
      <p>{blog.author}</p>
      {blog.user.username === user.username && (
        <button id="remove" onClick={handleRemove}>
          Remove
        </button>
      )}
    </div>
  );
};
