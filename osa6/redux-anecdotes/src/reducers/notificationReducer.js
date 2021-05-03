export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

let timeoutID = null;

export const setNotification = (notification, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    const cancelPreviousReset = () => clearTimeout(timeoutID);

    const resetNotification = () => {
      if (typeof timeoutID === 'number') {
        cancelPreviousReset();
      }

      timeoutID = setTimeout(() => {
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: null,
        });
        timeoutID = null;
      }, time * 1000);
    };

    resetNotification();
  };
};
