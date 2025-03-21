// src/components/dashboard/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Dashboard = ({ auth: { user } }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
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
    <motion.section 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="dashboard-header" variants={itemVariants}>
        <h1>Welcome, {user && user.username}</h1>
        <p>Your Tarot Journey Dashboard</p>
        
        <div className="user-stats">
          <div className="stat-item">
            <i className="fas fa-coins"></i>
            <div className="stat-content">
              <h3>Token Balance</h3>
              <motion.p 
                className="stat-value"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {user ? user.tokenBalance : 0}
              </motion.p>
            </div>
          </div>
          
          <div className="stat-item">
            <i className="fas fa-book-open"></i>
            <div className="stat-content">
              <h3>Readings</h3>
              <p className="stat-value">3</p>
            </div>
          </div>
          
          <div className="stat-item">
            <i className="fas fa-calendar-alt"></i>
            <div className="stat-content">
              <h3>Member Since</h3>
              <p className="stat-value">March 2025</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div className="dashboard-actions" variants={itemVariants}>
        <h2>Quick Actions</h2>
        
        <div className="action-cards">
          <motion.div 
            className="action-card"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="action-icon">
              <i className="fas fa-magic"></i>
            </div>
            <h3>New Reading</h3>
            <p>Get insights from the cards with our AI-powered readings</p>
            <Link to="/new-reading" className="btn btn-primary">Start Reading</Link>
          </motion.div>
          
          <motion.div 
            className="action-card"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="action-icon">
              <i className="fas fa-coins"></i>
            </div>
            <h3>Buy Tokens</h3>
            <p>Purchase tokens to unlock premium tarot readings</p>
            <Link to="/tokens" className="btn btn-primary">Get Tokens</Link>
          </motion.div>
          
          <motion.div 
            className="action-card"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="action-icon">
              <i className="fas fa-history"></i>
            </div>
            <h3>Reading History</h3>
            <p>Review your past readings and insights</p>
            <Link to="/history" className="btn btn-primary">View History</Link>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div className="recent-readings" variants={itemVariants}>
        <h2>Recent Readings</h2>
        
        <div className="reading-preview">
          <div className="reading-preview-header">
            <h3>Three Card Reading</h3>
            <span className="reading-date">March 18, 2025</span>
          </div>
          <p className="reading-question">"What should I focus on in my career right now?"</p>
          <div className="reading-cards-preview">
            <img src="/images/cards/high-priestess.jpg" alt="The High Priestess" />
            <img src="/images/cards/wheel-of-fortune.jpg" alt="Wheel of Fortune" />
            <img src="/images/cards/star.jpg" alt="The Star" className="reversed" />
          </div>
          <Link to="/readings/reading-1" className="btn btn-secondary btn-sm">View Full Reading</Link>
        </div>
        
        <Link to="/history" className="view-all-link">
          View All Readings <i className="fas fa-arrow-right"></i>
        </Link>
      </motion.div>
    </motion.section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
