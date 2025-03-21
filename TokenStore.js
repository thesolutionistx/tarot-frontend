// src/components/tokens/TokenStore.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Mock stripe promise for demonstration
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = ({ selectedPackage, setIsPurchasing }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setSucceeded(true);
      setProcessing(false);
    }, 2000);
  };
  
  return (
    <motion.form 
      className="checkout-form" 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Complete Your Purchase</h3>
      <div className="package-summary">
        <p>Package: {selectedPackage.name}</p>
        <p>Tokens: {selectedPackage.tokens}</p>
        <p>Price: ${selectedPackage.price}</p>
      </div>
      <div className="card-element-container">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="form-actions">
        <motion.button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsPurchasing(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          disabled={processing || !stripe}
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {processing ? 'Processing...' : `Pay $${selectedPackage.price}`}
        </motion.button>
      </div>
      {succeeded && (
        <motion.div 
          className="success-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Payment successful! Your tokens have been added to your account.
        </motion.div>
      )}
    </motion.form>
  );
};

const TokenStore = ({ user }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  // Mock token packages
  const tokenPackages = [
    {
      id: 'basic',
      name: 'Basic Package',
      tokens: 50,
      price: 10,
      description: 'Perfect for beginners'
    },
    {
      id: 'standard',
      name: 'Standard Package',
      tokens: 150,
      price: 25,
      description: 'Most popular choice'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      tokens: 500,
      price: 75,
      description: 'Best value for enthusiasts'
    }
  ];
  
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setIsPurchasing(true);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const packageVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <section className="token-store">
      <motion.div 
        className="token-store-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Token Store</h1>
        <p>Purchase tokens to unlock premium tarot readings</p>
        <div className="token-balance">
          <span>Your Balance:</span>
          <motion.span 
            className="token-amount"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {user ? user.tokenBalance : 0} tokens
          </motion.span>
        </div>
      </motion.div>
      
      {!isPurchasing ? (
        <motion.div 
          className="token-packages"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tokenPackages.map(pkg => (
            <motion.div 
              key={pkg.id} 
              className="token-package"
              variants={packageVariants}
              whileHover="hover"
            >
              <h3>{pkg.name}</h3>
              <div className="token-count">{pkg.tokens} tokens</div>
              <div className="token-price">${pkg.price}</div>
              <p>{pkg.description}</p>
              <motion.button 
                className="btn btn-primary"
                onClick={() => handlePackageSelect(pkg)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Purchase
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm 
            selectedPackage={selectedPackage}
            setIsPurchasing={setIsPurchasing}
          />
        </Elements>
      )}
    </section>
  );
};

TokenStore.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth ? state.auth.user : null
});

export default connect(mapStateToProps)(TokenStore);
