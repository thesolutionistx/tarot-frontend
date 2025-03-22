// src/reducers/tokenReducer.js
import {
  GET_TOKEN_PACKAGES,
  TOKEN_PACKAGES_ERROR,
  CREATE_PAYMENT_INTENT,
  PAYMENT_INTENT_ERROR,
  CONFIRM_PURCHASE,
  PURCHASE_ERROR,
  GET_TRANSACTIONS,
  TRANSACTIONS_ERROR
} from '../actions/types';

const initialState = {
  packages: [],
  transactions: [],
  paymentIntent: null,
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_PACKAGES:
      return {
        ...state,
        packages: action.payload,
        loading: false
      };
    case CREATE_PAYMENT_INTENT:
      return {
        ...state,
        paymentIntent: action.payload,
        loading: false
      };
    case CONFIRM_PURCHASE:
      return {
        ...state,
        loading: false
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false
      };
    case TOKEN_PACKAGES_ERROR:
    case PAYMENT_INTENT_ERROR:
    case PURCHASE_ERROR:
    case TRANSACTIONS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
