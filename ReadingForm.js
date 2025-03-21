// src/components/readings/ReadingForm.js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import TarotCard from '../tarot/TarotCard';

// Mock tarot deck data
const tarotDeck = [
  {
    id: 'fool',
    name: 'The Fool',
    image: 'fool.jpg',
    description: 'New beginnings, innocence, spontaneity'
  },
  {
    id: 'magician',
    name: 'The Magician',
    image: 'magician.jpg',
    description: 'Manifestation, resourcefulness, power'
  },
  {
    id: 'high-priestess',
    name: 'The High Priestess',
    image: 'high-priestess.jpg',
    description: 'Intuition, unconscious, inner voice'
  },
  {
    id: 'empress',
    name: 'The Empress',
    image: 'empress.jpg',
    description: 'Femininity, beauty, nature, abundance'
  },
  {
    id: 'emperor',
    name: 'The Emperor',
    image: 'emperor.jpg',
    description: 'Authority, structure, control, fatherhood'
  },
  // More cards would be added here
];

// Mock reading types
const readingTypes = [
  {
    id: 'single-card',
    name: 'Single Card Reading',
    description: 'A quick reading focusing on a specific question',
    tokenCost: 5,
    cardCount: 1
  },
  {
    id: 'three-card',
    name: 'Three Card Reading',
    description: 'Past, Present, Future or Situation, Action, Outcome',
    tokenCost: 15,
    cardCount: 3
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross Reading',
    description: 'A comprehensive reading for deep insights',
    tokenCost: 30,
    cardCount: 10
  }
];

const ReadingForm = ({ user, history }) => {
  const [formData, setFormData] = useState({
    readingType: '',
    question: '',
    cards: []
  });
  const [step, setStep] = useState(1);
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  
  const { readingType, question } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Set card count based on reading type
    if (e.target.name === 'readingType') {
      const selected = readingTypes.find(type => type.id === e.target.value);
      setCardCount(selected ? selected.cardCount : 0);
    }
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const shuffleDeck = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setIsShuffling(false);
    }, 2000);
  };
  
  const drawCard = () => {
    if (selectedCards.length >= cardCount) {
      return;
    }
    
    // Get random card
    let randomCard;
    do {
      randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
    } while (selectedCards.some(card => card.id === randomCard.id));
    
    // Determine if card is reversed (20% chance)
    const isReversed = Math.random() < 0.2;
    
    // Get position based on reading type
    let position;
    if (readingType === 'single-card') {
      position = 'Present';
    } else if (readingType === 'three-card') {
      const positions = ['Past', 'Present', 'Future'];
      position = positions[selectedCards.length];
    } else if (readingType === 'celtic-cross') {
      const positions = [
        'Present', 'Challenge', 'Past', 'Future', 
        'Above', 'Below', 'Advice', 'External Influences', 
        'Hopes and Fears', 'Outcome'
      ];
      position = positions[selectedCards.length];
    }
    
    // Add card to selected cards
    setSelectedCards([
      ...selectedCards, 
      { 
        ...randomCard, 
        isReversed, 
        position 
      }
    ]);
  };
  
  const submitReading = () => {
    // In a real app, this would call an API to generate the reading
    // For demo purposes, we'll just redirect to a mock reading result
    history.push('/readings/mock-reading-id');
  };
  
  // Check if user has enough tokens
  const getTokenCost = () => {
    if (!readingType) return 0;
    const selected = readingTypes.find(type => type.id === readingType);
    return selected ? selected.tokenCost : 0;
  };
  
  const hasEnoughTokens = user && user.tokenBalance >= getTokenCost();
  
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
    }
  };
  
  // Render steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            className="reading-step"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={itemVariants}>Choose Your Reading Type</motion.h2>
            <div className="reading-types">
              {readingTypes.map(type => (
                <motion.div 
                  key={type.id} 
                  className={`reading-type ${readingType === type.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, readingType: type.id })}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" 
                  }}
                >
                  <h3>{type.name}</h3>
                  <p>{type.description}</p>
                  <div className="reading-details">
                    <span>{type.cardCount} cards</span>
                    <span>{type.tokenCost} tokens</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div className="token-info" variants={itemVariants}>
              <p>Your balance: {user ? user.tokenBalance : 0} tokens</p>
              {!hasEnoughTokens && readingType && (
                <p className="token-warning">
                  You don't have enough tokens for this reading. 
                  <a href="/tokens">Purchase more tokens</a>
                </p>
              )}
            </motion.div>
            <motion.div className="form-actions" variants={itemVariants}>
              <motion.button 
                className="btn btn-primary" 
                onClick={nextStep}
                disabled={!readingType || !hasEnoughTokens}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            className="reading-step"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={itemVariants}>What Would You Like to Know?</motion.h2>
            <motion.div className="form-group" variants={itemVariants}>
              <label htmlFor="question">Enter your question or focus for this reading:</label>
              <textarea
                name="question"
                value={question}
                onChange={onChange}
                placeholder="e.g., What should I focus on in my career right now?"
                rows="4"
                required
              ></textarea>
            </motion.div>
            <motion.div className="form-actions" variants={itemVariants}>
              <motion.button 
                className="btn btn-secondary" 
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
              <motion.button 
                className="btn btn-primary" 
                onClick={nextStep}
                disabled={!question}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            className="reading-step"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={itemVariants}>Draw Your Cards</motion.h2>
            <motion.p variants={itemVariants}>Focus on your question as you draw your cards.</motion.p>
            
            <motion.div className="card-drawing" variants={itemVariants}>
              <div className="card-actions">
                <motion.button 
                  className={`btn btn-secondary ${isShuffling ? 'shuffling' : ''}`} 
                  onClick={shuffleDeck}
                  disabled={isShuffling}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isShuffling ? { 
                    rotate: [0, 5, -5, 0],
                    transition: { 
                      repeat: Infinity, 
                      duration: 0.5 
                    }
                  } : {}}
                >
                  {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
                </motion.button>
                <motion.button 
                  className="btn btn-primary" 
                  onClick={drawCard}
                  disabled={isShuffling || selectedCards.length >= cardCount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Draw Card ({selectedCards.length}/{cardCount})
                </motion.button>
              </div>
              
              <div className="selected-cards">
                {selectedCards.map((card, index) => (
                  <motion.div 
                    key={index} 
                    className="selected-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TarotCard 
                      card={card} 
                      isReversed={card.isReversed} 
                    />
                    <div className="card-position">{card.position}</div>
                  </motion.div>
                ))}
                {Array(cardCount - selectedCards.length).fill().map((_, index) => (
                  <motion.div 
                    key={`empty-${index}`} 
                    className="empty-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="card-back"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div className="form-actions" variants={itemVariants}>
              <motion.button 
                className="btn btn-secondary" 
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
              <motion.button 
                className="btn btn-primary" 
                onClick={submitReading}
                disabled={selectedCards.length < cardCount}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Reading
              </motion.button>
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };
  
  return (
    <section className="reading-form">
      <div className="reading-form-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          New Tarot Reading
        </motion.h1>
        <motion.div 
          className="progress-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
        </motion.div>
        {renderStep()}
      </div>
    </section>
  );
};

ReadingForm.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth ? state.auth.user : null
});

export default connect(mapStateToProps)(ReadingForm);
