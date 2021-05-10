import React, { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';

import { useDispatch } from 'react-redux';

import { Notification } from './components/Notification';
import { LoginForm } from './components/LoginForm';
import { BlogForm } from './components/BlogForm';
import { Blogs } from './components/Blogs';
import { Togglable } from './components/Togglable';

import { Button } from '@material-ui/core';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    dispatch(initializeBlogs());
  }, []);

  /**
   * @param message Message to deliver
   */
  const handleNotifications = (message) => {
    dispatch(setNotification(message, 5));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      handleNotifications('Wrong credentials');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken(null);
    setUser(null);
  };

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  // Broken for now, missing user info from db so doesn't show remove button unless you manually refresh
  const handleBlogSubmit = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div className="app">
      {user === null ? (
        <div>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameInput}
            handlePasswordChange={handlePasswordInput}
            username={username}
            password={password}
          />
        </div>
      ) : (
        <div>
          <header>
            <h1 className="page-title">Blogs</h1>
            <div className="user-info">
              <span>{user.name} logged in</span>
              <Button
                variant="contained"
                color="default"
                className="button"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          </header>
          <main>
            <Notification />
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
              <BlogForm createBlog={handleBlogSubmit} />
            </Togglable>
            <Blogs user={user} />
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
