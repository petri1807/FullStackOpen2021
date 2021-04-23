import React, { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import { Notification } from './components/Notification';
import { LoginForm } from './components/LoginForm';
import { BlogForm } from './components/BlogForm';
import { Blogs } from './components/Blogs';
import { Togglable } from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const fetchBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    fetchBlogs();
  }, []);

  /**
   * @param message Message to deliver
   * @param type Error, success
   */
  const handleNotifications = (message, type) => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification(null);
      setNotificationType(null);
    }, 5000);
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
      handleNotifications('Wrong credentials', 'error');
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

  const handleLike = (newObject) => {
    const newBlog = { ...newObject, likes: newObject.likes + 1 };
    blogService.update(newBlog);

    fetchBlogs();
  };

  const handleBlogSubmit = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      const response = await blogService.create(blogObject);
      if (response) {
        fetchBlogs();
        handleNotifications(`A new blog ${response.title} added`, 'success');
      }
    } catch (error) {
      handleNotifications(error.message, 'error');
    }
  };

  const handleBlogRemove = (blog) => {
    blogService
      .erase(blog.id)
      .then(() => {
        fetchBlogs();
        handleNotifications(
          `Deleted ${blog.title} by ${blog.author}`,
          'success'
        );
      })
      .catch((error) => handleNotifications(error.message), 'error');
  };

  return (
    <div>
      <Notification message={notification} type={notificationType} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameInput}
          handlePasswordChange={handlePasswordInput}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <h1>Blogs</h1>
          <div className="userInfo">
            <p>{user.name} logged in</p>
            <button className="button" onClick={handleLogout}>
              Log out
            </button>
          </div>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm createBlog={handleBlogSubmit} />
          </Togglable>
          <Blogs
            blogs={blogs}
            fetch={fetchBlogs}
            notificationHandler={handleNotifications}
            likeHandler={handleLike}
            removeHandler={handleBlogRemove}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
