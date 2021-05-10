import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import Header from './Header';

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
      <Header />
      <h1>{selectedUser.name}</h1>
      <TableContainer
        component={Paper}
        elevation={3}
        style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}
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
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
