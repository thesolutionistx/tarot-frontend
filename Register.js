import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from './actions/authActions';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      await register({ name, email, password });
      // Registration success is handled by the isAuthenticated effect below
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  // Redirect if logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-primary-dark to-primary-darker">
      <div className="absolute inset-0 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-10 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" stroke="#FFD700" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-1/3 right-10 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#FFD700" strokeWidth="2" />
            <path d="M50 5L50 95M5 50L95 50M15 15L85 85M15 85L85 15" stroke="#FFD700" strokeWidth="1" />
          </svg>
        </div>
      </div>
      
      <motion.div 
        className="glass-panel w-full max-w-md p-8 md:p-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-6 text-center">
            Begin Your Journey
          </h2>
        </motion.div>
        
        {error && (
          <motion.div 
            className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}
        
        <motion.form onSubmit={onSubmit} variants={itemVariants}>
          <div className="mb-5">
            <label className="block font-cinzel text-accent-gold mb-2" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
              className="w-full bg-white/5 border border-accent-gold/30 rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/50"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="mb-5">
            <label className="block font-cinzel text-accent-gold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full bg-white/5 border border-accent-gold/30 rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/50"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-5">
            <label className="block font-cinzel text-accent-gold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
              className="w-full bg-white/5 border border-accent-gold/30 rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/50"
              placeholder="Create a password"
            />
          </div>
          
          <div className="mb-8">
            <label className="block font-cinzel text-accent-gold mb-2" htmlFor="password2">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
              className="w-full bg-white/5 border border-accent-gold/30 rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/50"
              placeholder="Confirm your password"
            />
          </div>
          
          <motion.button
            type="submit"
            className="btn-primary w-full flex justify-center items-center"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Embark on Your Path'
            )}
          </motion.button>
        </motion.form>
        
        <motion.div 
          className="mt-8 text-center text-white/80"
          variants={itemVariants}
        >
          <p>
            Already on your journey?{' '}
            <Link href="/login">
              <a className="text-accent-gold hover:text-accent-gold-light transition-colors">
                Login here
              </a>
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth?.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
