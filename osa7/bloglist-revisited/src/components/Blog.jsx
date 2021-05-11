import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { likeBlog, deleteBlog } from '../reducers/blogReducer';

import { Button, Paper, Box, Link } from '@material-ui/core';

export const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch('/blogs/:id');
  if (!match) return null;

  const user = useSelector((state) => state.user);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  );

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      history.push('/');
    }
  };

  return (
    <Paper elevation={3} className="blogItem">
      <div className="blog-header">
        <p className="author">{blog.author}</p>
        <p className="blog-title">{blog.title}</p>
        <p>Added by {blog.user.name}</p>
      </div>
      <div className="blog-buttons">
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
