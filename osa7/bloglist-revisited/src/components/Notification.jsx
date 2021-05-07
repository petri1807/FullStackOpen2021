import React from 'react';
import { Card } from '@material-ui/core';
import { useSelector } from 'react-redux';

export const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (!message) return null;

  const notificationStyle = {};

  message.includes('A new blog') || message.includes('Deleted')
    ? (notificationStyle.color = 'green')
    : (notificationStyle.color = 'red');

  return (
    <Card className="notification" style={notificationStyle}>
      {message}
    </Card>
  );
};
