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
import { readingAPI } from '../services/api';

// Get reading types
export const getReadingTypes = () => async dispatch => {
  try {
    const res = await readingAPI.getReadingTypes();
    dispatch({
      type: GET_READING_TYPES,
      payload: res.data.readingTypes
    });
  } catch (err) {
    dispatch({
      type: READING_TYPES_ERROR,
      payload: err.response?.data?.message || 'Error fetching reading types'
    });
  }
};

// Generate reading
export const generateReading = readingData => async dispatch => {
  dispatch({ type: SET_LOADING });
  try {
    const res = await readingAPI.generateReading(readingData);
    dispatch({
      type: GENERATE_READING,
      payload: res.data.reading
    });
    return res.data.reading;
  } catch (err) {
    dispatch({
      type: READING_ERROR,
      payload: err.response?.data?.message || 'Error generating reading'
    });
    throw err;
  }
};

// Get user readings
export const getUserReadings = () => async dispatch => {
  dispatch({ type: SET_LOADING });
  try {
    const res = await readingAPI.getUserReadings();
    dispatch({
      type: GET_READINGS,
      payload: res.data.readings
    });
  } catch (err) {
    dispatch({
      type: READING_ERROR,
      payload: err.response?.data?.message || 'Error fetching readings'
    });
  }
};

// Get reading by ID
export const getReadingById = id => async dispatch => {
  dispatch({ type: SET_LOADING });
  try {
    const res = await readingAPI.getReadingById(id);
    dispatch({
      type: GET_READING,
      payload: res.data.reading
    });
  } catch (err) {
    dispatch({
      type: READING_ERROR,
      payload: err.response?.data?.message || 'Error fetching reading'
    });
  }
};

// Clear current reading
export const clearReading = () => dispatch => {
  dispatch({ type: CLEAR_READING });
};
