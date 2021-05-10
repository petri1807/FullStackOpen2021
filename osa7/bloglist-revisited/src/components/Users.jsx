import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logoutUser } from '../reducers/userReducer';
import userService from '../services/users';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';

const Users = () => {
  // Change this to redux
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    userService.getAll().then((res) => setUsers(res));
  }, []);

  const tableHeaderStyle = {
    backgroundColor: 'hsl(100, 40%, 30%)',
    color: 'white',
    fontSize: '1.2em',
  };

  return (
    <div>
      <h1 className="page-title">Blogs</h1>
      <p>{user.name} logged in</p>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          dispatch(logoutUser());
          history.push('/');
        }}
      >
        log out
      </Button>
      <h2>Users</h2>
      <TableContainer
        component={Paper}
        elevation={3}
        style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}
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
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell align="right">{u.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
