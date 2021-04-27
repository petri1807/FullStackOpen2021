import React, { useState } from 'react';
import { Button, Box, TextField } from '@material-ui/core';

/**
 * @param createBlog - Handler for blog creation
 */
export const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <div className="input-container">
        <TextField
          variant="standard"
          color="secondary"
          type="text"
          placeholder="Title"
          // multiline
          value={title}
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="input-container">
        <TextField
          variant="standard"
          color="secondary"
          type="text"
          placeholder="Author"
          value={author}
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className="input-container">
        <TextField
          variant="standard"
          color="secondary"
          type="text"
          placeholder="URL"
          value={url}
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
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
