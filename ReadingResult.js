import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import TarotCard from './TarotCard';
import { getReadingById } from './actions/readingActions';

const ReadingResult = ({ auth: { user }, reading, getReadingById }) => {
  const router = useRouter();
  const { id } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReading = async () => {
      if (id) {
        try {
          await getReadingById(id);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching reading:', err);
          setError('Unable to load your reading. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchReading();
  }, [id, getReadingById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <svg className="animate-spin h-12 w-12 text-accent-gold mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-cinzel text-accent-gold">Revealing your reading...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-dark flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="mb-4 text-red-500">
              <svg className="h-16 w-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-cinzel text-accent-gold mb-4">Reading Error</h2>
            <p className="text-white mb-6">{error}</p>
            <button 
              onClick={() => router.push('/reading')}
              className="btn-primary px-6 py-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!reading || !reading.cards) {
    return (
      <div className="min-h-screen bg-primary-dark flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <h2 className="text-2xl font-cinzel text-accent-gold mb-4">Reading Not Found</h2>
            <p className="text-white mb-6">We couldn't find the reading you're looking for.</p>
            <button 
              onClick={() => router.push('/reading')}
              className="btn-primary px-6 py-2"
            >
              New Reading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-cinzel text-accent-gold mb-4">Your Tarot Reading</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            {reading.question}
          </p>
        </motion.div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-cinzel text-accent-gold mb-6 text-center">Your Cards</h2>
          
          <div className={`grid gap-6 ${reading.cards.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-5'}`}>
            {reading.cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-center"
              >
                <TarotCard
                  card={card}
                  isActive={activeCard === index}
                  onClick={() => setActiveCard(activeCard === index ? null : index)}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-primary-medium rounded-xl p-6 md:p-8 shadow-xl mb-8"
        >
          <h2 className="text-2xl font-cinzel text-accent-gold mb-4">Reading Insight</h2>
          
          {activeCard !== null ? (
            <div>
              <h3 className="text-xl font-cinzel text-white mb-2">
                {reading.cards[activeCard].name} 
                {reading.cards[activeCard].isReversed ? ' (Reversed)' : ''}
                <span className="text-accent-gold"> - {reading.cards[activeCard].position}</span>
              </h3>
              <p className="text-white/90 mb-4 leading-relaxed">
                This card represents {reading.cards[activeCard].isReversed ? 'challenges or internal aspects of' : ''} 
                {reading.cards[activeCard].name}'s energy in your {reading.cards[activeCard].position.toLowerCase()} position.
              </p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                {reading.interpretation}
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-3"
            onClick={() => router.push('/reading')}
          >
            New Reading
          </motion.button>
        </div>
      </div>
    </div>
  );
};

ReadingResult.propTypes = {
  auth: PropTypes.object.isRequired,
  reading: PropTypes.object,
  getReadingById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  reading: state.reading.reading
});

export default connect(mapStateToProps, { getReadingById })(ReadingResult);
