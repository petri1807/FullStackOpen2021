import blogService from '../services/blogs';

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return (dispatch) => {
    blogService.setToken(user.token);
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    dispatch({
      type: 'SET_USER',
      user,
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    blogService.setToken(null);
    window.localStorage.removeItem('loggedUser');
    dispatch({
      type: 'LOGOUT_USER',
    });
  };
};
