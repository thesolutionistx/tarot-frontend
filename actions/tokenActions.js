// src/actions/tokenActions.js
import axios from 'axios';
import {
  GET_TOKEN_PACKAGES,
  TOKEN_PACKAGES_ERROR,
  CREATE_PAYMENT_INTENT,
  PAYMENT_INTENT_ERROR,
  CONFIRM_PURCHASE,
  PURCHASE_ERROR,
  GET_TRANSACTIONS,
  TRANSACTIONS_ERROR
} from './types';

// Get token packages
export const getTokenPackages = () => async dispatch => {
  try {
    const res = await axios.get('/api/tokens/packages');

    dispatch({
      type: GET_TOKEN_PACKAGES,
      payload: res.data.tokenPackages
    });
  } catch (err) {
    dispatch({
      type: TOKEN_PACKAGES_ERROR,
      payload: err.response.data.message
    });
  }
};

// Create payment intent
export const createPaymentIntent = packageId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/tokens/payment-intent', { packageId }, config);

    dispatch({
      type: CREATE_PAYMENT_INTENT,
      payload: res.data
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: PAYMENT_INTENT_ERROR,
      payload: err.response.data.message
    });

    throw err;
  }
};

// Confirm token purchase
export const confirmPurchase = (transactionId, paymentIntentId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      '/api/tokens/confirm-purchase',
      { transactionId, paymentIntentId },
      config
    );

    dispatch({
      type: CONFIRM_PURCHASE,
      payload: res.data
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: PURCHASE_ERROR,
      payload: err.response.data.message
    });

    throw err;
  }
};

// Get user transactions
export const getUserTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/api/tokens/transactions');

    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data.transactions
    });
  } catch (err) {
    dispatch({
      type: TRANSACTIONS_ERROR,
      payload: err.response.data.message
    });
  }
};
