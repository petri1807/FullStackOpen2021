import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { logoutUser } from '../reducers/userReducer';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <header>
      <h1 className="page-title">Blogs</h1>
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
