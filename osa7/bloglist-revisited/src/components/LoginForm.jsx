import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, TextField, Paper } from '@material-ui/core';

/**
 * @param handleLogin
 * @param handlePasswordChange
 * @param handleUsernameChange
 * @param username
 * @param password
 */
const LoginForm = ({
  handleLogin,
  handlePasswordChange,
  handleUsernameChange,
  username,
  password,
}) => {
  const inputRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sets focus on username input when page loads
    inputRef.current.focus();
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <header>
        <h1>Log in</h1>
        <div className="cred-div">
          <Button
            variant="outlined"
            color="secondary"
            onClick={toggleVisibility}
          >
            {!visible ? 'Show valid login credentials' : 'Hide credentials'}
          </Button>
          {visible && (
            <Paper elevation={3} className="login-credentials">
              <p>Sivulle voi kirjautua käyttäen tunnuksia</p>
              <p>petri1807 : salasana</p>
              <p>satanist666 : dineshatemylunch</p>
              <p>themanfrompakistan : iloveteslas</p>
              <p>bitchard : middleout</p>
              <p>jared : gwent</p>
            </Paper>
          )}
        </div>
      </header>
      <main>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-container">
            <TextField
              variant="standard"
              color="secondary"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              ref={inputRef}
            />
          </div>
          <div className="input-container">
            <TextField
              variant="standard"
              color="secondary"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Box m={3}>
            <Button
              variant="contained"
              color="secondary"
              id="login-button"
              type="submit"
              className="button"
            >
              Log in
            </Button>
          </Box>
        </form>
      </main>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
