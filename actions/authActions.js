import { 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from './types';
import { authAPI } from '../services/api';

// Load user from token
export const loadUser = () => async (dispatch) => {
  try {
    const res = await authAPI.getCurrentUser();
    
    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await authAPI.login({ email, password });
    
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    
    return true;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || 'Login failed'
    });
    
    return false;
  }
};

// Register user
export const register = (username, email, password) => async (dispatch) => {
  try {
    const res = await authAPI.register({ username, email, password });
    
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    
    return true;
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data?.message || 'Registration failed'
    });
    
    return false;
  }
};

// Logout user
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  dispatch({
    type: LOGOUT
  });
};
