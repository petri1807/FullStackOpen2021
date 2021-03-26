import React from 'react';

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => (
  <>
    {props.content.map((item) => (
      <Part part={item.name} exercises={item.exercises} />
    ))}
  </>
);

const Total = (props) => {
  let total = 0;
  props.parts.map((item) => (total += item.exercises));
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
