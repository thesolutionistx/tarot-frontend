// src/actions/readingActions.js
import axios from 'axios';
import {
  GET_READING_TYPES,
  READING_TYPES_ERROR,
  GENERATE_READING,
  READING_ERROR,
  GET_READINGS,
  GET_READING,
  CLEAR_READING,
  SET_LOADING
} from './types';

// Get reading types
export const getReadingTypes = () => async dispatch => {
  try {
    const res = await axios.get('/api/readings/types');

    dispatch({
      type: GET_READING_TYPES,
      payload: res.data.readingTypes
    });
  } catch (err) {
    dispatch({
      type: READING_TYPES_ERROR,
      payload: err.response.data.message
    });
  }
};

// Generate reading
export const generateReading = readingData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.post('/api/readings/generate', readingData, config);

    dispatch({
      type: GENERATE_READING,
      payload: res.data.reading
    });

    return res.data.reading;
  } catch (err) {
    dispatch({
      type: READING_ERROR,
      payload: err.response.data.message
    });

    throw err;
  }
};

// Get user readings
export const getUserReadings = () => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get('/api/readings');

    dispatch({
      type: GET_READINGS,
      payload: res.data.readings
    });
  } catch (err) {
    dispatch({
      type: READING_ERROR,
      payload: err.response.data.message
    });
  }
};

// Get reading by ID
export const getReadingById = id => async dispatch => {
  dispatch({ type: SET_LOADING });

  try {
    const res = await axios.get(`/api/readings/${id}`);

    dispatch({
      type: GET_READING,
      payload: res.data.reading
    });
  } catch (err) {
    dispatch({
      type: READING_ERROR,
      payload: err.response.data.message
    });
  }
};

// Clear current reading
export const clearReading = () => dispatch => {
  dispatch({ type: CLEAR_READING });
};
