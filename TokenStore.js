import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from './Navbar';
import { purchaseTokens, getTokenPlans } from './actions/tokenActions';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51QxCAzKOv5dcCRayCeN4EaGDTQSFrRQQiw4cTmiS3KItw18rwqRhQ3LyHEzkFPVdat6VxUeIafU8gTIDyjSOkibo00qL95XGaz');

const CheckoutForm = ({ selectedPlan, onSuccess, onError, purchaseTokens }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    setIsProcessing(true);
    setErrorMessage('');
    
    try {
      // Create payment intent on the server
      const paymentIntentResponse = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ planId: selectedPlan.id })
      });
      
      const paymentIntentData = await paymentIntentResponse.json();
      
      if (!paymentIntentData.success) {
        throw new Error(paymentIntentData.message || 'Error creating payment intent');
      }
      
      // Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentData.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: 'Tarot User',
            },
          },
        }
      );
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (paymentIntent.status === 'succeeded') {
        // Confirm payment on the server and add tokens to user
        await purchaseTokens({
          paymentIntentId: paymentIntent.id,
          planId: selectedPlan.id
        });
        
        onSuccess();
      } else {
        throw new Error('Payment processing failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage(error.message || 'An error occurred during payment processing');
      onError();
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-6">
        <label className="block text-white mb-2">Card Details</label>
        <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
        </div>
      </div>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-white rounded-lg">
          {errorMessage}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn-primary w-full py-3 flex justify-center items-center"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          `Pay $${selectedPlan.price.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const TokenStore = ({ auth: { user, loading }, tokenPlans, getTokenPlans, purchaseTokens }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    getTokenPlans();
  }, [getTokenPlans]);
  
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setPurchaseComplete(false);
    setError(null);
  };
  
  const handlePaymentSuccess = () => {
    setPurchaseComplete(true);
    setSelectedPlan(null);
  };
  
  const handlePaymentError = () => {
    setError('Payment processing failed. Please try again.');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <svg className="animate-spin h-12 w-12 text-accent-gold mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-cinzel text-accent-gold">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-primary-dark flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-cinzel text-accent-gold mb-4">Token Store</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Purchase tokens to unlock the mystical wisdom of the tarot. Each reading requires tokens, with more complex spreads providing deeper insights.
          </p>
          
          {user && (
            <div className="mt-4 inline-block px-6 py-2 bg-primary-medium rounded-full">
              <span className="text-white">Current Balance: </span>
              <span className="text-accent-gold font-bold">{user.tokenBalance} Tokens</span>
            </div>
          )}
        </motion.div>
        
        {purchaseComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 bg-green-900/30 border border-green-500 text-white p-6 rounded-xl text-center"
          >
            <div className="text-green-400 mb-3">
              <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-cinzel text-accent-gold mb-2">Purchase Complete!</h2>
            <p className="mb-4">Your tokens have been added to your account.</p>
            <Link href="/reading">
              <motion.a
                className="btn-primary inline-block px-6 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Reading
              </motion.a>
            </Link>
          </motion.div>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 bg-red-900/30 border border-red-500 text-white p-6 rounded-xl text-center"
          >
            <div className="text-red-400 mb-3">
              <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-cinzel text-accent-gold mb-2">Payment Error</h2>
            <p>{error}</p>
          </motion.div>
        )}
        
        {selectedPlan ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-primary-medium rounded-xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-cinzel text-accent-gold">Checkout</h2>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="text-white/70 hover:text-white"
              >
                ← Back to plans
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-primary-dark/50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-cinzel text-white">{selectedPlan.name} Plan</h3>
                  <p className="text-accent-gold">{selectedPlan.tokens} Tokens</p>
                </div>
                <div className="text-2xl text-white font-bold">${selectedPlan.price.toFixed(2)}</div>
              </div>
            </div>
            
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                selectedPlan={selectedPlan} 
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                purchaseTokens={purchaseTokens}
              />
            </Elements>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {tokenPlans && tokenPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: tokenPlans.indexOf(plan) * 0.1 }}
                className={`bg-primary-medium rounded-xl overflow-hidden shadow-xl ${
                  plan.popular ? 'ring-2 ring-accent-gold' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-accent-gold text-primary-dark text-center py-1 font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-cinzel text-accent-gold mb-2">{plan.name}</h3>
                  
                  <div className="mb-4">
                    <span className="text-3xl text-white font-bold">${plan.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full text-sm font-medium">
                        {plan.tokens} Tokens
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-accent-gold flex-shrink-0 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <motion.button
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-accent-gold text-primary-dark hover:bg-accent-gold/90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Select Plan
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

TokenStore.propTypes = {
  auth: PropTypes.object.isRequired,
  tokenPlans: PropTypes.array,
  getTokenPlans: PropTypes.func.isRequired,
  purchaseTokens: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tokenPlans: state.token.plans
});

export default connect(mapStateToProps, { getTokenPlans, purchaseTokens })(TokenStore);
