import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Landing = ({ isAuthenticated }) => {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
    
    // Create mystical background elements
    createMysticalBackground();
  }, [isAuthenticated, router]);
  
  // Function to create mystical background elements
  const createMysticalBackground = () => {
    if (typeof window !== 'undefined') {
      const mysticalBg = document.createElement('div');
      mysticalBg.className = 'mystical-bg';
      document.body.appendChild(mysticalBg);
      
      // Create stars
      for (let i = 0; i < 50; i++) {
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
      for (let i = 0; i < 3; i++) {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div 
        className="text-center max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-cinzel font-bold mb-6 text-shadow-gold"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Tarot Insights
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl font-cormorant mb-12 text-white/90"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Discover your path through the ancient wisdom of tarot
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register">
              <a className="btn-primary inline-block">Begin Your Journey</a>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/login">
              <a className="btn-secondary inline-block">Return to Your Path</a>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-10 w-20 h-20 opacity-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#FFD700" strokeWidth="2" />
          <path d="M50 5L50 95" stroke="#FFD700" strokeWidth="1" />
          <path d="M5 50L95 50" stroke="#FFD700" strokeWidth="1" />
          <path d="M20 20L80 80" stroke="#FFD700" strokeWidth="1" />
          <path d="M20 80L80 20" stroke="#FFD700" strokeWidth="1" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-10 w-32 h-32 opacity-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#FFD700" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" stroke="#FFD700" strokeWidth="1" />
          <circle cx="50" cy="50" r="15" stroke="#FFD700" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth?.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
