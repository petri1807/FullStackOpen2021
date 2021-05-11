import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';
import { tableHeaderStyle } from '../styles/styles';

export const Blogs = () => {
  const redux_blogs = useSelector((state) => state.blogs);
  const sortedBlogs = redux_blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      style={{
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2em',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={tableHeaderStyle}>All blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBlogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
