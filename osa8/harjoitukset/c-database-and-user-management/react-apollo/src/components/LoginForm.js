import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphQL/queries';
import { Button, TextField, Stack } from '@mui/material';
import { inputVariant, buttonVariant } from './constants';

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('phonenumbers-user-token', token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <TextField
            id="username"
            value={username}
            label="Username"
            variant={inputVariant}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            id="password"
            type="password"
            value={password}
            label="Password"
            variant={inputVariant}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default LoginForm;
