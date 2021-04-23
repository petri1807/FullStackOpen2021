import React, { useState } from 'react';

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
    <div className="form">
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div className="inputField">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="inputField">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="inputField">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="blogSubmit" type="submit" className="button">
          Create
        </button>
      </form>
    </div>
  );
};
