import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import {
  likeBlog,
  deleteBlog,
  createNewComment,
} from '../reducers/blogReducer';

import {
  Button,
  Paper,
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  TextField,
} from '@material-ui/core';
import { tableHeaderStyle, linkStyle } from '../styles/styles';

const buttonProps = (id, onClick, color) => {
  return {
    id,
    onClick,
    variant: 'contained',
    color: color || 'primary',
  };
};

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch('/blogs/:id');
  if (!match) return null;

  const user = useSelector((state) => state.user);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  );

  // Fixes refreshing
  if (!blog) return null;

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const comment = { comment: event.target.comment.value };
    event.target.comment.value = '';

    dispatch(createNewComment(blog.id, comment));
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      history.push('/');
    }
  };

  const likeButton = buttonProps('like', handleLike);
  const removeButton = buttonProps('remove', handleRemove, 'secondary');

  return (
    <Paper elevation={3} className="blogItem">
      <div className="blog-header">
        <p className="blog-title">
          {blog.title} by {blog.author}
        </p>
        <p>Added by {blog.user.name}</p>
        <Link
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          style={linkStyle}
        >
          {blog.url}
        </Link>
      </div>
      <div>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '1em',
            marginBottom: '1em',
          }}
        >
          <Button {...likeButton}>like</Button>
          <div style={{ marginLeft: '1em' }}>{blog.likes} likes</div>
        </Box>

        {/* Bit broken still, submitting a new blog renders a version which does not contain
        the user info so you need to refresh the page to get the remove button to pop up*/}
        {blog.user.username === user.username && (
          <Button {...removeButton}>Delete blog</Button>
        )}
      </div>
      <div>
        <form
          onSubmit={handleCommentSubmit}
          style={{ marginTop: '1em', marginBottom: '1em' }}
        >
          <Button type="submit" variant="contained" color="primary">
            POST
          </Button>
          <TextField
            variant="standard"
            color="primary"
            type="text"
            id="comment"
            name="comment"
            placeholder="Add comment"
            style={{
              marginLeft: '1em',
              // width: '90%',
            }}
          />
        </form>
      </div>

      {blog.comments.length ? (
        <TableContainer
          style={{
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '2em',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={tableHeaderStyle}>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blog.comments.map(({ comment, id, date }) => {
                const dateTime = new Date(date).toISOString();
                const dateString = new Date(date).toLocaleDateString('fi-FI');
                const timeString = new Date(date).toLocaleTimeString('fi-FI');

                return (
                  <TableRow key={id}>
                    <TableCell>
                      <time dateTime={dateTime} style={{ fontSize: '0.75em' }}>
                        {dateString} {timeString}
                      </time>
                      <p>{comment}</p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Paper>
  );
};

export default Blog;
