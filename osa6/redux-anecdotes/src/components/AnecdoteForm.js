import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

export const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" type="text" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};