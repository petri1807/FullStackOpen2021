import React from 'react';
import { Header } from './Header';
import { Content } from './Content';

export const Course = ({ course }) => (
  <div>
    {course.map(({ id, name, parts }) => (
      <div key={id}>
        <Header text={name} />
        <Content parts={parts} />
      </div>
    ))}
  </div>
);
