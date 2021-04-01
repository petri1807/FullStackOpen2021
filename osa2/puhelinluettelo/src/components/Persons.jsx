import React from 'react';

export const Persons = ({ list, buttonHandler }) => {
  return list.map((person) => (
    <div key={person.name}>
      {person.name}: {person.number}{' '}
      <button onClick={() => buttonHandler(person.id)}>delete</button>
    </div>
  ));
};
