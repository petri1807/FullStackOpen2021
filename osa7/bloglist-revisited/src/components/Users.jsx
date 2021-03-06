import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setUsers } from '../reducers/usersReducer';

import { tableHeaderStyle, linkStyle } from '../styles/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (!allUsers.length) {
      dispatch(setUsers());
    }
  }, []);

  return (
    <div>
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
              <TableCell style={tableHeaderStyle}>User</TableCell>
              <TableCell align="right" style={tableHeaderStyle}>
                Blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`} style={linkStyle}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
