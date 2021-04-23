import React from 'react';

/**
 * @param message Message shown to user
 * @param type Message type [error, success]
 */
export const Notification = ({ message, type }) => {
  if (!message || !type) return null;

  const getStyles = () => {
    if (type === 'error') return { color: 'red' };
    if (type === 'success') return { color: 'green' };
  };

  return (
    <div className="notification" style={getStyles()}>
      {message}
    </div>
  );
};
