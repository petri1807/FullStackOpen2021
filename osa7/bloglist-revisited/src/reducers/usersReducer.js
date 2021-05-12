import userService from '../services/users';

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.data;
    default:
      return state;
  }
};

export const setUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: 'SET_USERS',
      data: users,
    });
  };
};
