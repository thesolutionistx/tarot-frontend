// src/reducers/readingReducer.js
import {
  GET_READING_TYPES,
  READING_TYPES_ERROR,
  GENERATE_READING,
  READING_ERROR,
  GET_READINGS,
  GET_READING,
  CLEAR_READING,
  SET_LOADING
} from '../actions/types';

const initialState = {
  readingTypes: [],
  readings: [],
  currentReading: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_READING_TYPES:
      return {
        ...state,
        readingTypes: action.payload,
        loading: false
      };
    case GENERATE_READING:
      return {
        ...state,
        currentReading: action.payload,
        loading: false
      };
    case GET_READINGS:
      return {
        ...state,
        readings: action.payload,
        loading: false
      };
    case GET_READING:
      return {
        ...state,
        currentReading: action.payload,
        loading: false
      };
    case CLEAR_READING:
      return {
        ...state,
        currentReading: null
      };
    case READING_TYPES_ERROR:
    case READING_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
