import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from './Navbar';

const Dashboard = ({ auth: { user, loading } }) => {
  const [userName, setUserName] = useState('Seeker');

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    }
    
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
  }, [user]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary-darker">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-cinzel text-accent-gold">Reading the stars...</p>
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
              Welcome, {userName}
            </h1>
            <p className="text-xl font-cormorant text-white/90">
              Your mystical journey awaits. What secrets will the cards reveal today?
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card Reading */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="glass-panel p-6 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 mb-4">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="15" width="60" height="80" rx="3" stroke="#FFD700" strokeWidth="2" />
                  <rect x="30" y="25" width="40" height="60" rx="2" stroke="#FFD700" strokeWidth="1.5" />
                  <path d="M50 35L55 45H45L50 35Z" stroke="#FFD700" strokeWidth="1.5" />
                  <path d="M50 75L45 65H55L50 75Z" stroke="#FFD700" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-cinzel font-bold mb-3 text-accent-gold">Tarot Reading</h3>
              <p className="text-white/80 mb-6 font-cormorant">
                Seek guidance from the ancient wisdom of the tarot. Choose your spread and discover what the universe has in store for you.
              </p>
              <Link href="/reading">
                <a className="btn-primary mt-auto">Begin Reading</a>
              </Link>
            </motion.div>
            
            {/* Reading History */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="glass-panel p-6 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 mb-4">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="35" stroke="#FFD700" strokeWidth="2" />
                  <path d="M50 25V50L65 65" stroke="#FFD700" strokeWidth="2" />
                  <path d="M25 15L75 15" stroke="#FFD700" strokeWidth="1.5" />
                  <path d="M20 85L80 85" stroke="#FFD700" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-cinzel font-bold mb-3 text-accent-gold">Past Readings</h3>
              <p className="text-white/80 mb-6 font-cormorant">
                Review your journey through the arcana. Reflect on past readings and track how your path has unfolded.
              </p>
              <Link href="/history">
                <a className="btn-secondary mt-auto">View History</a>
              </Link>
            </motion.div>
            
            {/* Token Store */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="glass-panel p-6 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 mb-4">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="30" stroke="#FFD700" strokeWidth="2" />
                  <path d="M40 50H60" stroke="#FFD700" strokeWidth="2" />
                  <path d="M50 40V60" stroke="#FFD700" strokeWidth="2" />
                  <path d="M30 30L70 70" stroke="#FFD700" strokeWidth="1.5" opacity="0.6" />
                  <path d="M30 70L70 30" stroke="#FFD700" strokeWidth="1.5" opacity="0.6" />
                </svg>
              </div>
              <h3 className="text-2xl font-cinzel font-bold mb-3 text-accent-gold">Token Store</h3>
              <p className="text-white/80 mb-6 font-cormorant">
                Enhance your mystical journey with reading tokens. Purchase tokens to unlock deeper insights and premium readings.
              </p>
              <Link href="/tokens">
                <a className="btn-secondary mt-auto">Visit Store</a>
              </Link>
            </motion.div>
          </div>
          
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

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
