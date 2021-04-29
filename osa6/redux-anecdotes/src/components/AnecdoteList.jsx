import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filtered = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()) ? true : false
  );

  const sortedByLikes = filtered.sort((a, b) => (a.votes > b.votes ? -1 : 1));

  return (
    <div>
      {sortedByLikes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(addVote(anecdote.id));
            dispatch(setNotification(`you voted ${anecdote.content}`));
            setTimeout(() => dispatch(setNotification(null)), 5000);
          }}
        />
      ))}
    </div>
  );
};
