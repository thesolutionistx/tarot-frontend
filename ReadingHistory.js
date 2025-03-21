// src/components/readings/ReadingHistory.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock reading history data
const mockReadings = [
  {
    id: 'reading-1',
    readingType: 'three-card',
    question: 'What should I focus on in my career right now?',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    tokensSpent: 15,
    cards: [
      {
        id: 'high-priestess',
        name: 'The High Priestess',
        image: 'high-priestess.jpg',
        position: 'Past',
        isReversed: false
      },
      {
        id: 'wheel-of-fortune',
        name: 'Wheel of Fortune',
        image: 'wheel-of-fortune.jpg',
        position: 'Present',
        isReversed: false
      },
      {
        id: 'star',
        name: 'The Star',
        image: 'star.jpg',
        position: 'Future',
        isReversed: true
      }
    ]
  },
  {
    id: 'reading-2',
    readingType: 'single-card',
    question: 'What energy surrounds me today?',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    tokensSpent: 5,
    cards: [
      {
        id: 'sun',
        name: 'The Sun',
        image: 'sun.jpg',
        position: 'Present',
        isReversed: false
      }
    ]
  },
  {
    id: 'reading-3',
    readingType: 'three-card',
    question: 'How can I improve my relationship with my partner?',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    tokensSpent: 15,
    cards: [
      {
        id: 'lovers',
        name: 'The Lovers',
        image: 'lovers.jpg',
        position: 'Past',
        isReversed: false
      },
      {
        id: 'temperance',
        name: 'Temperance',
        image: 'temperance.jpg',
        position: 'Present',
        isReversed: true
      },
      {
        id: 'two-of-cups',
        name: 'Two of Cups',
        image: 'two-of-cups.jpg',
        position: 'Future',
        isReversed: false
      }
    ]
  }
];

const ReadingHistory = () => {
  // Format reading type
  const formatReadingType = (type) => {
    switch (type) {
      case 'single-card':
        return 'Single Card Reading';
      case 'three-card':
        return 'Three Card Reading';
      case 'celtic-cross':
        return 'Celtic Cross Reading';
      default:
        return type;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
    },
    hover: {
      y: -10,
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.section 
      className="reading-history"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Reading History
      </motion.h1>
      
      {mockReadings.length === 0 ? (
        <motion.div 
          className="history-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p>You haven't had any readings yet.</p>
          <Link to="/new-reading" className="btn btn-primary">
            Get Your First Reading
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          className="history-list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {mockReadings.map((reading, index) => (
            <motion.div 
              key={reading.id} 
              className="history-item"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="history-header">
                <h3>{formatReadingType(reading.readingType)}</h3>
                <div className="history-date">
                  {formatDate(reading.createdAt)}
                </div>
              </div>
              <div className="history-question">
                "{reading.question}"
              </div>
              <div className="history-cards">
                {reading.cards.map((card, cardIndex) => (
                  <div key={cardIndex} className="history-card">
                    <img 
                      src={`/images/cards/${card.image}`} 
                      alt={card.name} 
                      className={card.isReversed ? 'reversed' : ''}
                    />
                    <div className="card-name">
                      {card.name} ({card.position})
                    </div>
                  </div>
                ))}
              </div>
              <div className="history-footer">
                <div className="tokens-spent">
                  <span>{reading.tokensSpent}</span> tokens spent
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={`/readings/${reading.id}`} className="btn btn-primary btn-sm">
                    View Full Reading
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      <motion.div 
        className="history-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link to="/new-reading" className="btn btn-primary">
          New Reading
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default ReadingHistory;
