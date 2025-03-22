import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import TarotCard from './tarot/TarotCard';

const ReadingForm = ({ auth: { user } }) => {
  const [spread, setSpread] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [readingType, setReadingType] = useState('general');

  const spreadOptions = [
    { value: '1', label: 'Single Card', description: 'Quick insight for a specific situation' },
    { value: '3', label: 'Past-Present-Future', description: 'Understand your journey through time' },
    { value: '5', label: 'Five Card Cross', description: 'Detailed analysis of your current situation' },
    { value: '7', label: 'Chakra Spread', description: 'Insight into your energy centers' },
    { value: '10', label: 'Celtic Cross', description: 'Comprehensive reading for complex questions' }
  ];

  const readingTypes = [
    { value: 'general', label: 'General Guidance', description: 'Overall insight into your life path' },
    { value: 'love', label: 'Love & Relationships', description: 'Guidance for matters of the heart' },
    { value: 'career', label: 'Career & Finances', description: 'Insight into your professional journey' },
    { value: 'spiritual', label: 'Spiritual Growth', description: 'Guidance for your spiritual development' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for demo purposes
    setTimeout(() => {
      window.location.href = '/result';
    }, 1500);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary-darker">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-4 text-shadow-gold">
              Tarot Reading
            </h1>
            <p className="text-xl font-cormorant text-white/90">
              Focus your energy and intention as you prepare to receive guidance from the cards
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="glass-panel p-8 md:p-10 mb-10"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block font-cinzel text-accent-gold mb-3 text-xl" htmlFor="question">
                  What question seeks an answer?
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter your question or focus for this reading..."
                  className="w-full bg-white/5 border border-accent-gold/30 rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/50 h-32 resize-none"
                ></textarea>
                <p className="mt-2 text-white/60 text-sm italic">
                  For the clearest guidance, be specific but open-ended in your inquiry
                </p>
              </div>
              
              <div className="mb-8">
                <label className="block font-cinzel text-accent-gold mb-3 text-xl">
                  Choose your reading type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {readingTypes.map((type) => (
                    <motion.div 
                      key={type.value}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        readingType === type.value 
                          ? 'border-accent-gold bg-accent-gold/10' 
                          : 'border-white/20 hover:border-accent-gold/50'
                      }`}
                      onClick={() => setReadingType(type.value)}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-3 border ${
                          readingType === type.value 
                            ? 'border-accent-gold bg-accent-gold' 
                            : 'border-white/50'
                        }`}>
                          {readingType === type.value && (
                            <div className="w-2 h-2 bg-primary-dark rounded-full m-auto"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-cinzel font-medium text-white">{type.label}</h3>
                          <p className="text-white/70 text-sm">{type.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mb-10">
                <label className="block font-cinzel text-accent-gold mb-3 text-xl">
                  Select your spread
                </label>
                <div className="grid grid-cols-1 gap-4">
                  {spreadOptions.map((option) => (
                    <motion.div 
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        spread === option.value 
                          ? 'border-accent-gold bg-accent-gold/10' 
                          : 'border-white/20 hover:border-accent-gold/50'
                      }`}
                      onClick={() => setSpread(option.value)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 border ${
                          spread === option.value 
                            ? 'border-accent-gold bg-accent-gold' 
                            : 'border-white/50'
                        }`}>
                          {spread === option.value && (
                            <div className="w-2.5 h-2.5 bg-primary-dark rounded-full m-auto"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-cinzel font-medium text-white">{option.label}</h3>
                          <p className="text-white/70">{option.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.button
                type="submit"
                className="btn-primary w-full py-4 text-lg flex justify-center items-center"
                disabled={isLoading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Drawing the Cards...
                  </>
                ) : (
                  'Reveal the Cards'
                )}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-1/4 -left-20 w-40 h-40 opacity-10 hidden lg:block"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#FFD700" strokeWidth="1" />
              <path d="M50 5L50 95" stroke="#FFD700" strokeWidth="0.5" />
              <path d="M5 50L95 50" stroke="#FFD700" strokeWidth="0.5" />
              <path d="M20 20L80 80" stroke="#FFD700" strokeWidth="0.5" />
              <path d="M20 80L80 20" stroke="#FFD700" strokeWidth="0.5" />
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-1/4 -right-20 w-40 h-40 opacity-10 hidden lg:block"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" stroke="#FFD700" strokeWidth="1" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

ReadingForm.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ReadingForm);
