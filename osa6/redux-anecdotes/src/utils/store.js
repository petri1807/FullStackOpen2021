import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { anecdoteReducer } from '../reducers/anecdoteReducer';

export const store = createStore(anecdoteReducer, composeWithDevTools());
