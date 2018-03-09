import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { LoginReducer as login } from './LoginReducer';

const reducers = combineReducers({
  login,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;