import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from './reducers/anecdoteReducer';
import { AnecdoteForm } from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const sortedByLikes = anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1));

  const vote = (id) => {
    console.log('vote', id);
    dispatch(addVote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedByLikes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;