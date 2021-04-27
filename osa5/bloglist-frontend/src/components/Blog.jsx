import React, { useState } from 'react';
import { Button, Paper, Box, Link } from '@material-ui/core';

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
      <Paper elevation={3} className="blogItem">
        <div className="blog-header">
          <p className="author"> {blog.author}</p>
          <p className="blog-title">{blog.title}</p>
        </div>
        <div className="blog-buttons">
          <Box pr="0.5em" pt="0.5em" pb="0.5em">
            <Button variant="outlined" id="view" onClick={toggleVisibility}>
              View
            </Button>
          </Box>
        </div>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className="blogItem">
      <div className="blog-header">
        <p className="author">{blog.author}</p>
        <p className="blog-title">{blog.title}</p>
      </div>
      <div className="blog-buttons">
        <Box pr="0.5em" pt="0.5em" pb="0.5em">
          <Button variant="outlined" id="hide" onClick={toggleVisibility}>
            hide
          </Button>
        </Box>

        <Box p="0.5em">
          <Button
            variant="contained"
            color="primary"
            id="like"
            className="button"
            onClick={handleLike}
          >
            like
          </Button>
        </Box>

        {blog.user.username === user.username && (
          <Box p="0.5em">
            <Button
              variant="contained"
              color="secondary"
              id="remove"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </Box>
        )}
      </div>
      <div className="blog-details">
        <Link href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </Link>
        <div>Likes {blog.likes}</div>
      </div>
    </Paper>
  );
};
