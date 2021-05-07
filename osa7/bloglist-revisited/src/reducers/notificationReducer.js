export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

let timeoutID;

export const setNotification = (notification, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    if (typeof timeoutID === 'number') {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: null,
      });
      timeoutID = null;
    }, time * 1000);
  };
};
