import React from 'react';
import { Part } from './Part';

export const Content = ({ parts }) => {
  const total = parts.reduce((sum, item) => sum + item.exercises, 0);

  return (
    <div>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
      <p>
        <strong>Total of {total} exercises</strong>
      </p>
    </div>
  );
};
