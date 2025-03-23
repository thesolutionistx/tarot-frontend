import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { generateReading } from './actions/readingActions';
import { drawRandomCards } from './services/tarotService';

const ReadingForm = ({ auth, generateReading }) => {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [readingType, setReadingType] = useState('general');
  const [spread, setSpread] = useState('single');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const readingTypes = [
    { value: 'general', label: 'General Guidance', description: 'Overall insight into your life path' },
    { value: 'love', label: 'Love & Relationships', description: 'Guidance for matters of the heart' },
    { value: 'career', label: 'Career & Finances', description: 'Insight into your professional journey' },
    { value: 'spiritual', label: 'Spiritual Growth', description: 'Guidance for your spiritual development' }
  ];

  const spreadOptions = [
    { value: 'single', label: 'Single Card', description: 'Quick insight for a specific situation', cardCount: 1 },
    { value: 'three', label: 'Past-Present-Future', description: 'Understand your journey through time', cardCount: 3 },
    { value: 'five', label: 'Five Card Cross', description: 'Detailed analysis of your current situation', cardCount: 5 },
    { value: 'celtic', label: 'Celtic Cross', description: 'Comprehensive reading for complex questions', cardCount: 10 }
  ];

  const getCardCount = (spreadValue) => {
    const option = spreadOptions.find(opt => opt.value === spreadValue);
    return option ? option.cardCount : 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Draw random cards based on selected spread
      const cardCount = getCardCount(spread);
      const cards = drawRandomCards(cardCount);

      // Generate reading using the cards and question
      const result = await generateReading({
        question,
        readingType: spread === 'single' ? 'single-card' : 
                    spread === 'three' ? 'three-card' : 
                    spread === 'five' ? 'five-card-cross' : 'celtic-cross',
        cards
      });

      // Navigate to result page with reading data
      router.push({
        pathname: '/result',
        query: { 
          id: result._id 
        }
      });
    } catch (err) {
      console.error('Error generating reading:', err);
      setError('Unable to generate reading. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="relative bg-primary-medium rounded-xl shadow-2xl p-6 sm:p-10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-cinzel text-accent-gold text-center mb-8">Tarot Reading</h1>
            <p className="text-white/80 text-center mb-10">
              Focus your energy and intention as you prepare to receive guidance from the cards
            </p>
            
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-white px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block font-cinzel text-accent-gold mb-3 text-xl">
                  What question seeks an answer?
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all min-h-[120px]"
                  placeholder="Enter your question or focus for this reading..."
                  required
                ></textarea>
                <p className="text-white/60 text-sm mt-2 italic">
                  For the clearest guidance, be specific but open-ended in your inquiry
                </p>
              </div>
              
              <div className="mb-8">
                <label className="block font-cinzel text-accent-gold mb-3 text-xl">
                  Choose your reading type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {readingTypes.map((type) => (
                    <motion.div 
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        readingType === type.value 
                          ? 'border-accent-gold bg-accent-gold/10' 
                          : 'border-white/20 hover:border-accent-gold/50'
                      }`}
                      onClick={() => setReadingType(type.value)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 border ${
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
  auth: PropTypes.object.isRequired,
  generateReading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { generateReading })(ReadingForm);
