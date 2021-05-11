import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';

import { tableHeaderStyle } from '../styles/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';

const User = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const match = useRouteMatch('/users/:id');
  const selectedUser = match
    ? allUsers.find((user) => user.id === match.params.id)
    : null;
  if (!selectedUser) return null;

  return (
    <div>
      <h1>{selectedUser.name}</h1>
      <TableContainer
        component={Paper}
        elevation={3}
        style={{ maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={tableHeaderStyle}>Added blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedUser.blogs.map((blog) => (
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
    </div>
  );
};

export default User;
