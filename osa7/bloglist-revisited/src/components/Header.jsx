import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { logoutUser } from '../reducers/userReducer';
import Navigation from './Navigation';

const Header = () => {
  const [title, setTitle] = useState('Blogs');

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const titleHandler = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <header>
      <Navigation titleHandler={titleHandler} />

      <h1 className="page-title">{title}</h1>
      <div>
        <div style={{ marginBottom: '1em' }}>{user.name} logged in</div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(logoutUser());
            history.push('/');
          }}
        >
          Log out
        </Button>
      </div>
    </header>
  );
};

export default Header;
