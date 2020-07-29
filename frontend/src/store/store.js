import RootReducer from '../reducers/RootReducer';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(Thunk))
)