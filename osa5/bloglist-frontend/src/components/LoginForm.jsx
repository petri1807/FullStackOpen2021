import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * @param handleLogin
 * @param handlePasswordChange
 * @param handleUsernameChange
 * @param username
 * @param password
 */
export const LoginForm = ({
  handleLogin,
  handlePasswordChange,
  handleUsernameChange,
  username,
  password,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    // Sets focus on username input when page loads
    inputRef.current.focus();
  }, []);

  return (
    <div className="form">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className="inputField">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            id="username"
            onChange={handleUsernameChange}
            ref={inputRef}
          />
        </div>
        <div className="inputField">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit" className="button">
          Log in
        </button>
      </form>
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
