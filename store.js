import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Create a version that works with server-side rendering
const createStoreWithMiddleware = () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
};

// Create store
const store = createStoreWithMiddleware();

export default store;
