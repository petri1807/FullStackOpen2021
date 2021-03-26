import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ anecdote, points, handlers }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <q>{anecdote}</q>
    <p>Has {points} votes</p>
    <Button handleClick={handlers.voteHandler} text="vote" />
    <Button handleClick={handlers.nextHandler} text="next anecdote" />
  </div>
);

const MostVotes = ({ anecdote, points }) => {
  if (!points) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes cast</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <q>{anecdote}</q>
        <p>Has {points} votes</p>
      </div>
    );
  }
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const nextHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteHandler = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  console.log(Math.max(...points));

  const findTheAnecdoteWithMostVotes = () => {
    const maxPoints = Math.max(...points);
    const indexOfMaxPoints = points.indexOf(maxPoints);
    const anecdote = anecdotes[indexOfMaxPoints];
    return { maxPoints, anecdote };
  };

  const topAnecdote = findTheAnecdoteWithMostVotes();

  return (
    <div>
      <Anecdote
        anecdote={anecdotes[selected]}
        points={points[selected]}
        handlers={{ nextHandler, voteHandler }}
      />
      <MostVotes
        anecdote={topAnecdote.anecdote}
        points={topAnecdote.maxPoints}
      />
    </div>
  );
};

export default App;
