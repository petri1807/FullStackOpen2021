import React from 'react';

// Basic styles live in index.css, color is chosen by message type
const styles = {
  confirm: { color: 'green' },
  erase: { color: 'purple' },
  error: { color: 'red' },
};

export const Notification = ({ message }) => {
  if (!message) return null;

  const getStyles = () => {
    const word = message.split(' ')[0];
    if (word === 'Added' || word === 'Updated') return styles.confirm;
    if (word === 'Deleted') return styles.erase;
    if (word === 'Error') return styles.error;
  };

  return (
    <div>
      <div className="notification" style={getStyles()}>
        {message}
      </div>
    </div>
  );
};
