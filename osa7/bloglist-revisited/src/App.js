import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import loginService from './services/login';

import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser as setReduxUser } from './reducers/userReducer';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import Users from './components/Users';
import Header from './components/Header';
import User from './components/User';

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

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
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
          <Header />
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/">
              <main>
                <Notification />
                <Togglable buttonLabel="New blog" ref={blogFormRef}>
                  <BlogForm
                    toggleVisibility={() =>
                      blogFormRef.current.toggleVisibility()
                    }
                  />
                </Togglable>
                <Blogs />
              </main>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};

export default App;
