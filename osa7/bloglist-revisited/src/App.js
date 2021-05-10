import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';

import loginService from './services/login';

import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser as setReduxUser, logoutUser } from './reducers/userReducer';

import { useDispatch, useSelector } from 'react-redux';

import { Notification } from './components/Notification';
import { LoginForm } from './components/LoginForm';
import { BlogForm } from './components/BlogForm';
import { Blogs } from './components/Blogs';
import { Togglable } from './components/Togglable';
import Users from './components/Users';

import { Button } from '@material-ui/core';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const redux_user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setReduxUser(user));
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

      dispatch(setReduxUser(user));
      setUsername('');
      setPassword('');
    } catch (error) {
      handleNotifications('Wrong credentials');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
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
      {redux_user === null ? (
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
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <header>
                <h1 className="page-title">Blogs</h1>
                <div className="user-info">
                  <span>{redux_user.name} logged in</span>
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
                <Blogs user={redux_user} />
              </main>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};

export default App;
