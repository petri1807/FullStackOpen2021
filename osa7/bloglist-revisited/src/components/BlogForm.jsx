import React from 'react';
import { Button, Box, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createNewBlog } from '../reducers/blogReducer';

const inputProps = (name) => {
  return {
    name,
    id: name,
    placeholder: name,
    type: 'text',
    variant: 'standard',
    color: 'secondary',
  };
};

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();

  const titleInput = inputProps('title');
  const authorInput = inputProps('author');
  const urlInput = inputProps('url');

  const addBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    const blog = { title, author, url };

    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';

    dispatch(createNewBlog(blog));
    toggleVisibility();
  };

  return (
    <form onSubmit={addBlog}>
      <div className="input-container">
        <TextField {...titleInput} />
      </div>
      <div className="input-container">
        <TextField {...authorInput} />
      </div>
      <div className="input-container">
        <TextField {...urlInput} />
      </div>
      <Box m="1em">
        <Button
          variant="contained"
          color="primary"
          id="blogSubmit"
          type="submit"
          className="button"
        >
          Create
        </Button>
      </Box>
    </form>
  );
};

export default BlogForm;
