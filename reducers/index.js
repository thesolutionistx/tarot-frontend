// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tokenReducer from './tokenReducer';
import readingReducer from './readingReducer';

export default combineReducers({
  auth: authReducer,
  token: tokenReducer,
  reading: readingReducer
});
