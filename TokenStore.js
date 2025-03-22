import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './Navbar';

// Mock Stripe promise for development
const stripePromise = loadStripe('pk_test_placeholder');

const TokenStore = ({ auth: { user, loading } }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  
  const tokenPlans = [
    {
      id: 'basic',
      name: 'Seeker',
      tokens: 10,
      price: 4.99,
      features: [
        '10 Tarot Reading Tokens',
        'Single Card Readings',
        'Past-Present-Future Spreads',
        '24-hour Support'
      ]
    },
    {
      id: 'standard',
      name: 'Mystic',
      tokens: 25,
      price: 9.99,
      popular: true,
      features: [
        '25 Tarot Reading Tokens',
        'All Reading Spreads',
        'Detailed Card Interpretations',
        'Priority Support',
        'Reading History Storage'
      ]
    },
    {
      id: 'premium',
      name: 'Oracle',
      tokens: 60,
      price: 19.99,
      features: [
        '60 Tarot Reading Tokens',
        'All Reading Spreads',
        'Premium Card Interpretations',
        'AI-Enhanced Insights',
        'VIP Support',
        'Unlimited Reading History'
      ]
    }
  ];
  
  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };
  
  const handlePurchase = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate purchase process
    setTimeout(() => {
      setIsProcessing(false);
      setPurchaseComplete(true);
    }, 2000);
  };
  
  useEffect(() => {
    // Create mystical background elements
    const createMysticalBackground = () => {
      if (typeof window !== 'undefined') {
        const mysticalBg = document.createElement('div');
        mysticalBg.className = 'mystical-bg';
        document.body.appendChild(mysticalBg);
        
        // Create stars
        for (let i = 0; i < 30; i++) {
          const star = document.createElement('div');
          star.className = 'mystical-star';
          star.style.width = `${Math.random() * 3 + 1}px`;
          star.style.height = star.style.width;
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          star.style.animationDelay = `${Math.random() * 4}s`;
          mysticalBg.appendChild(star);
        }
        
        // Create mystical circles
        for (let i = 0; i < 2; i++) {
          const circle = document.createElement('div');
          circle.className = 'mystical-circle';
          const size = Math.random() * 300 + 200;
          circle.style.width = `${size}px`;
          circle.style.height = `${size}px`;
          circle.style.left = `${Math.random() * 100}%`;
          circle.style.top = `${Math.random() * 100}%`;
          circle.style.animationDuration = `${Math.random() * 60 + 30}s`;
          mysticalBg.appendChild(circle);
        }
      }
    };
    
    createMysticalBackground();
    
    return () => {
      // Clean up mystical background on unmount
      if (typeof window !== 'undefined') {
        const mysticalBg = document.querySelector('.mystical-bg');
        if (mysticalBg) {
          mysticalBg.remove();
        }
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: i => ({ 
      y: 0, 
      opacity: 1, 
      transition: { 
        delay: i * 0.2,
        duration: 0.5
      } 
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary-darker">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-cinzel text-accent-gold">Loading the mystical store...</p>
        </div>
      </div>
    );
  }

  if (purchaseComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary-darker">
        <Navbar />
        
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-panel p-10 flex flex-col items-center">
              <div className="w-20 h-20 mb-6">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="#FFD700" strokeWidth="2" />
                  <path d="M30 50L45 65L70 35" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-4 text-accent-gold">
                Purchase Complete!
              </h2>
              
              <p className="text-xl font-cormorant text-white/90 mb-8">
                Your tokens have been added to your account. The universe awaits your exploration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/reading">
                  <a className="btn-primary">Begin a Reading</a>
                </Link>
                <Link href="/dashboard">
                  <a className="btn-secondary">Return to Dashboard</a>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary-darker">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-4 text-shadow-gold">
              Token Store
            </h1>
            <p className="text-xl font-cormorant text-white/90">
              Enhance your mystical journey with reading tokens. Choose the plan that resonates with your spirit.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {tokenPlans.map((plan, index) => (
              <motion.div 
                key={plan.id}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                className={`glass-panel p-6 flex flex-col relative overflow-hidden ${
                  selectedPlan === plan.id ? 'border-2 border-accent-gold ring-4 ring-accent-gold/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-accent-gold text-primary-dark font-cinzel text-xs font-bold px-3 py-1 transform rotate-45 translate-x-5 translate-y-3">
                      Popular
                    </div>
                  </div>
                )}
                
                <h3 className="text-2xl font-cinzel font-bold mb-2 text-accent-gold">{plan.name}</h3>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="1.5" />
                      <path d="M8 12L11 15L16 9" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xl font-cinzel text-white">{plan.tokens} Tokens</span>
                  </div>
                </div>
                
                <ul className="mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start mb-3">
                      <svg className="w-5 h-5 text-accent-gold mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className={`w-full py-3 rounded-full font-cinzel font-medium transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'bg-accent-gold text-primary-dark' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </motion.button>
              </motion.div>
            ))}
          </div>
          
          {selectedPlan && (
            <motion.div 
              className="glass-panel p-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-cinzel font-bold mb-6 text-accent-gold text-center">
                Complete Your Purchase
              </h3>
              
              <Elements stripe={stripePromise}>
                <form onSubmit={handlePurchase}>
                  <div className="mb-6">
                    <label className="block font-cinzel text-accent-gold mb-2" htmlFor="card-element">
                      Card Details
                    </label>
                    <div className="bg-white/5 border border-accent-gold/30 rounded-lg p-4 h-12 flex items-center justify-center">
                      <p className="text-white/60 italic">Stripe payment form would appear here</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 my-6 pt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Plan</span>
                      <span className="text-white font-medium">
                        {tokenPlans.find(p => p.id === selectedPlan)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Tokens</span>
                      <span className="text-white font-medium">
                        {tokenPlans.find(p => p.id === selectedPlan)?.tokens}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-4">
                      <span className="text-white">Total</span>
                      <span className="text-accent-gold">
                        ${tokenPlans.find(p => p.id === selectedPlan)?.price}
                      </span>
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="btn-primary w-full py-4 text-lg flex justify-center items-center"
                    disabled={isProcessing}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
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
                      'Complete Purchase'
                    )}
                  </motion.button>
                </form>
              </Elements>
            </motion.div>
          )}
          
          {/* Decorative element */}
          <motion.div 
            className="mt-16 flex justify-center opacity-30"
            variants={itemVariants}
          >
            <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 25H200" stroke="#FFD700" strokeWidth="1" />
              <path d="M100 0L100 50" stroke="#FFD700" strokeWidth="1" />
              <circle cx="100" cy="25" r="8" stroke="#FFD700" strokeWidth="1" />
              <path d="M20 25L40 15V35L20 25Z" stroke="#FFD700" strokeWidth="1" />
              <path d="M180 25L160 15V35L180 25Z" stroke="#FFD700" strokeWidth="1" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

TokenStore.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TokenStore);
