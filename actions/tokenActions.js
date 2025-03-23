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
import { tokenAPI } from '../services/api';

// Get token packages
export const getTokenPackages = () => async dispatch => {
  try {
    const res = await tokenAPI.getTokenPackages();
    dispatch({
      type: GET_TOKEN_PACKAGES,
      payload: res.data.tokenPackages
    });
  } catch (err) {
    dispatch({
      type: TOKEN_PACKAGES_ERROR,
      payload: err.response?.data?.message || 'Error fetching token packages'
    });
  }
};

// Create payment intent
export const createPaymentIntent = packageId => async dispatch => {
  try {
    const res = await tokenAPI.createPaymentIntent(packageId);
    dispatch({
      type: CREATE_PAYMENT_INTENT,
      payload: res.data
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: PAYMENT_INTENT_ERROR,
      payload: err.response?.data?.message || 'Error creating payment intent'
    });
    throw err;
  }
};

// Confirm token purchase
export const confirmPurchase = (transactionId, paymentIntentId) => async dispatch => {
  try {
    const res = await tokenAPI.confirmPurchase(transactionId, paymentIntentId);
    dispatch({
      type: CONFIRM_PURCHASE,
      payload: res.data
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: PURCHASE_ERROR,
      payload: err.response?.data?.message || 'Error confirming purchase'
    });
    throw err;
  }
};

// Get user transactions
export const getUserTransactions = () => async dispatch => {
  try {
    const res = await tokenAPI.getUserTransactions();
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data.transactions
    });
  } catch (err) {
    dispatch({
      type: TRANSACTIONS_ERROR,
      payload: err.response?.data?.message || 'Error fetching transactions'
    });
  }
};
