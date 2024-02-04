 
import { legacy_createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
 import storeReducer from './reducers';

const store = legacy_createStore(
    storeReducer,
  applyMiddleware(thunk)
);

export default store;
