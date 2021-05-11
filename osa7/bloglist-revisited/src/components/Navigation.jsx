import React from 'react';
import { Link } from 'react-router-dom';

const navstyle = {
  backgroundColor: 'hsl(190, 80%, 20%)',
  width: '100vw',
  height: '4em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const linkStyle = {
  margin: '2em',
  padding: '1em',
  color: 'white',
  fontSize: '1.2em',
  textDecoration: 'none',
  textTransform: 'uppercase',
  cursor: 'pointer',
};

const Navigation = ({ titleHandler }) => {
  return (
    <nav style={navstyle}>
      <Link style={linkStyle} to="/" onClick={() => titleHandler('Blog App')}>
        Blogs
      </Link>
      <Link style={linkStyle} to="/users" onClick={() => titleHandler('Users')}>
        Users
      </Link>
    </nav>
  );
};

export default Navigation;
