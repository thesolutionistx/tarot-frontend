// src/components/layout/Landing.js
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="container">
        <div className="landing-content">
          <motion.div 
            className="landing-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Discover Your Path with Psychic Tarot</h1>
            <p>
              Unlock the wisdom of the cards with our AI-powered tarot readings.
              Get personalized insights and guidance for your life's journey.
            </p>
            <div className="landing-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/tarot-deck" className="btn btn-secondary">
                Free Reading
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="landing-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="/images/tarot-spread.jpg" alt="Tarot Reading" />
            <motion.img 
              src="/images/cards/sun.jpg" 
              alt="The Sun" 
              className="card-float"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            <motion.img 
              src="/images/cards/moon.jpg" 
              alt="The Moon" 
              className="card-float"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 5,
                delay: 1,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            <motion.img 
              src="/images/cards/star.jpg" 
              alt="The Star" 
              className="card-float"
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 8, 0]
              }}
              transition={{ 
                duration: 7,
                delay: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
