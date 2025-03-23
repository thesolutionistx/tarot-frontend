import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import { getUserReadings } from './actions/readingActions';

const ReadingHistory = ({ auth: { user, loading }, readings, getUserReadings }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        await getUserReadings();
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching reading history:', err);
        setError('Unable to load your reading history. Please try again.');
        setIsLoading(false);
      }
    };

    fetchReadings();
  }, [getUserReadings]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getReadingTypeLabel = (readingType) => {
    switch (readingType) {
      case 'single-card':
        return 'Single Card';
      case 'three-card':
        return 'Past-Present-Future';
      case 'five-card-cross':
        return 'Five Card Cross';
      case 'celtic-cross':
        return 'Celtic Cross';
      default:
        return readingType;
    }
  };

  const getSummary = (reading) => {
    // Extract first 150 characters of interpretation as summary
    if (reading.interpretation) {
      return reading.interpretation.length > 150 
        ? `${reading.interpretation.substring(0, 150)}...` 
        : reading.interpretation;
    }
    return 'No interpretation available';
  };

  const getCardNames = (cards) => {
    if (!cards || !Array.isArray(cards)) return [];
    return cards.map(card => card.name);
  };

  if (isLoading) {
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
            <h2 className="text-2xl font-cinzel text-accent-gold">Loading your reading history...</h2>
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
            <h2 className="text-2xl font-cinzel text-accent-gold mb-4">Error Loading History</h2>
            <p className="text-white mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary px-6 py-2"
            >
              Try Again
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
          <h1 className="text-4xl md:text-5xl font-cinzel text-accent-gold mb-4">Your Reading History</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Reflect on your journey through the arcana. Review past readings and track how your path has unfolded.
          </p>
        </motion.div>
        
        {readings && readings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {readings.map((reading, index) => (
              <motion.div
                key={reading._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-primary-medium rounded-xl p-6 shadow-xl h-full flex flex-col">
                  <div className="mb-4 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-cinzel text-accent-gold">{getReadingTypeLabel(reading.readingType)}</h3>
                      <p className="text-white/60 text-sm">{formatDate(reading.createdAt)}</p>
                    </div>
                    <div className="bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full text-xs">
                      {reading.cards.length} {reading.cards.length === 1 ? 'Card' : 'Cards'}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-1">Question:</h4>
                    <p className="text-white/80 italic">{reading.question}</p>
                  </div>
                  
                  <div className="mb-4 flex-grow">
                    <h4 className="text-white font-medium mb-1">Cards:</h4>
                    <div className="flex flex-wrap gap-2">
                      {getCardNames(reading.cards).map((card, i) => (
                        <span key={i} className="bg-primary-dark text-white/90 px-3 py-1 rounded-lg text-sm">
                          {card}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-1">Summary:</h4>
                    <p className="text-white/80 text-sm">{getSummary(reading)}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <Link href={`/result?id=${reading._id}`}>
                      <motion.a
                        className="block w-full text-center py-2 px-4 bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Full Reading
                      </motion.a>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-primary-medium rounded-xl p-8 text-center shadow-xl"
          >
            <div className="mb-4 text-accent-gold">
              <svg className="h-16 w-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-cinzel text-accent-gold mb-4">No Readings Yet</h2>
            <p className="text-white/80 mb-6">You haven't had any tarot readings yet. Begin your mystical journey by getting your first reading.</p>
            <button 
              onClick={() => router.push('/reading')}
              className="btn-primary px-6 py-3"
            >
              Get Your First Reading
            </button>
          </motion.div>
        )}
        
        {readings && readings.length > 0 && (
          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-3"
              onClick={() => router.push('/reading')}
            >
              New Reading
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

ReadingHistory.propTypes = {
  auth: PropTypes.object.isRequired,
  readings: PropTypes.array,
  getUserReadings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  readings: state.reading.readings
});

export default connect(mapStateToProps, { getUserReadings })(ReadingHistory);
