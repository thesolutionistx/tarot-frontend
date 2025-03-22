import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from './actions/authActions';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const authLinks = (
    <div className="flex items-center">
      <motion.div variants={itemVariants} className="hidden md:block">
        <Link href="/dashboard">
          <a className="text-white hover:text-accent-gold transition-colors px-4 py-2 font-cinzel">Dashboard</a>
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="hidden md:block">
        <Link href="/reading">
          <a className="text-white hover:text-accent-gold transition-colors px-4 py-2 font-cinzel">Reading</a>
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="hidden md:block">
        <Link href="/history">
          <a className="text-white hover:text-accent-gold transition-colors px-4 py-2 font-cinzel">History</a>
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="hidden md:block">
        <Link href="/tokens">
          <a className="text-white hover:text-accent-gold transition-colors px-4 py-2 font-cinzel">Tokens</a>
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="ml-4">
        <a 
          onClick={logout} 
          href="#!" 
          className="btn-secondary text-sm py-2"
        >
          <span className="hidden md:inline">Sign Out</span>
          <span className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm7 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm1 4a1 1 0 102 0V7a1 1 0 10-2 0v4z" clipRule="evenodd" />
            </svg>
          </span>
        </a>
      </motion.div>
    </div>
  );

  const guestLinks = (
    <div className="flex items-center">
      <motion.div variants={itemVariants} className="mr-4">
        <Link href="/login">
          <a className="btn-secondary text-sm py-2">Sign In</a>
        </Link>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Link href="/register">
          <a className="btn-primary text-sm py-2">Sign Up</a>
        </Link>
      </motion.div>
    </div>
  );

  const mobileMenu = (
    <motion.div 
      className={`fixed inset-0 z-50 ${isMenuOpen ? 'block' : 'hidden'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isMenuOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-primary-darker opacity-95" onClick={toggleMenu}></div>
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <button 
          className="absolute top-6 right-6 text-white hover:text-accent-gold"
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex flex-col items-center space-y-6">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <a className="text-white hover:text-accent-gold text-2xl font-cinzel" onClick={toggleMenu}>Dashboard</a>
              </Link>
              <Link href="/reading">
                <a className="text-white hover:text-accent-gold text-2xl font-cinzel" onClick={toggleMenu}>Reading</a>
              </Link>
              <Link href="/history">
                <a className="text-white hover:text-accent-gold text-2xl font-cinzel" onClick={toggleMenu}>History</a>
              </Link>
              <Link href="/tokens">
                <a className="text-white hover:text-accent-gold text-2xl font-cinzel" onClick={toggleMenu}>Tokens</a>
              </Link>
              <a 
                onClick={() => {
                  toggleMenu();
                  logout();
                }} 
                href="#!" 
                className="text-accent-gold hover:text-accent-gold-light text-2xl font-cinzel mt-6"
              >
                Sign Out
              </a>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="text-white hover:text-accent-gold text-2xl font-cinzel" onClick={toggleMenu}>Sign In</a>
              </Link>
              <Link href="/register">
                <a className="text-accent-gold hover:text-accent-gold-light text-2xl font-cinzel" onClick={toggleMenu}>Sign Up</a>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <motion.nav 
        className="bg-primary-darker/80 backdrop-blur-md py-4 px-6 sticky top-0 z-40 border-b border-accent-gold/20"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div variants={itemVariants} className="flex items-center">
            <Link href="/">
              <a className="text-accent-gold font-cinzel font-bold text-xl md:text-2xl flex items-center">
                <span className="mr-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="1.5" />
                    <path d="M12 6L14 10H10L12 6Z" stroke="#FFD700" strokeWidth="1.5" />
                    <path d="M12 18L10 14H14L12 18Z" stroke="#FFD700" strokeWidth="1.5" />
                    <path d="M6 12L10 10V14L6 12Z" stroke="#FFD700" strokeWidth="1.5" />
                    <path d="M18 12L14 14V10L18 12Z" stroke="#FFD700" strokeWidth="1.5" />
                  </svg>
                </span>
                Tarot Insights
              </a>
            </Link>
          </motion.div>
          
          <div className="hidden md:block">
            {!loading && (isAuthenticated ? authLinks : guestLinks)}
          </div>
          
          <motion.button 
            variants={itemVariants}
            className="md:hidden text-white hover:text-accent-gold"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </motion.nav>
      
      {mobileMenu}
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
