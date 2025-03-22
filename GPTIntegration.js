// src/components/readings/GPTIntegration.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const GPTIntegration = ({ cards, question, onGenerateReading }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Format cards for display
  const formatCardInfo = (card) => {
    return `${card.name}${card.isReversed ? ' (Reversed)' : ''} in the ${card.position} position`;
  };

  const handleGenerateReading = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the API
      // For demo purposes, we'll simulate the API call
      await onGenerateReading();
    } catch (err) {
      setError(err.message || 'Failed to generate reading');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div 
      className="gpt-integration"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="reading-summary">
        <h3>Reading Summary</h3>
        <div className="question-summary">
          <strong>Your Question:</strong>
          <p>"{question}"</p>
        </div>
        <div className="cards-summary">
          <strong>Your Cards:</strong>
          <ul>
            {cards.map((card, index) => (
              <li key={index}>{formatCardInfo(card)}</li>
            ))}
          </ul>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="generate-actions">
        <motion.button
          className="btn btn-primary"
          onClick={handleGenerateReading}
          disabled={isGenerating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGenerating ? (
            <>
              <span className="loading-spinner"></span>
              Consulting the cards...
            </>
          ) : (
            'Generate AI Reading'
          )}
        </motion.button>
        <p className="token-notice">
          This will use tokens from your account.
        </p>
      </div>
    </motion.div>
  );
};

GPTIntegration.propTypes = {
  cards: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  onGenerateReading: PropTypes.func.isRequired
};

export default GPTIntegration;
