// Auth action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGOUT = 'LOGOUT';

// Auth actions
export const login = (email, password) => async (dispatch) => {
  try {
    // This would normally make an API call
    const response = { data: { token: 'sample-token', user: { email } } };
    
    localStorage.setItem('token', response.data.token);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
    
    return true;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL
    });
    
    return false;
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    // This would normally make an API call
    const response = { data: { token: 'sample-token', user: { name, email } } };
    
    localStorage.setItem('token', response.data.token);
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });
    
    return true;
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL
    });
    
    return false;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  
  dispatch({
    type: LOGOUT
  });
};
