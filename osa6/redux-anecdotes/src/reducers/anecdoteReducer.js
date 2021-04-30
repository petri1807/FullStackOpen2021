import anecdoteService from '../services/anecdotes';

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    case 'NEW_ANECDOTE': {
      return [...state, action.data];
    }
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};
