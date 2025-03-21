// src/components/readings/ReadingResult.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TarotCard from '../tarot/TarotCard';

// Mock reading data
const mockReading = {
  id: 'mock-reading-id',
  readingType: 'three-card',
  question: 'What should I focus on in my career right now?',
  createdAt: new Date().toISOString(),
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
  ],
  interpretation: `Your career path has been guided by intuition and inner wisdom, as shown by The High Priestess in the past position. You've been developing a deep understanding of your field and trusting your instincts, which has served you well.

The Wheel of Fortune in your present position indicates that you're at a pivotal moment of change and opportunity. The wheel is turning in your favor, bringing new possibilities that may seem to arrive by chance but are actually the result of previous actions and decisions. This is an excellent time to embrace change rather than resist it.

The Star reversed in your future position suggests some caution is needed regarding your hopes and aspirations. While you have a vision for your future, you may be feeling some doubt or pessimism about achieving it. This card advises you to realign with your authentic purpose and not lose faith in your dreams.

The combination of these cards suggests that you should focus on remaining adaptable and open to unexpected opportunities in your career right now. The foundation of intuitive knowledge you've built (High Priestess) has prepared you for this moment of change (Wheel of Fortune), but you'll need to maintain optimism and faith in your path to fully realize your potential (Star reversed).

Consider areas where you might be limiting yourself through doubt or fear. The Star reversed is asking you to renew your hope and inspiration, perhaps by connecting with mentors or creative collaborators who can help you see the possibilities you might be missing.

In practical terms, this reading suggests focusing on:
1. Embracing change and new opportunities that are presenting themselves
2. Trusting the timing of events, even if they seem random
3. Reconnecting with your original inspiration and purpose
4. Addressing any pessimism or limiting beliefs about your future
5. Remaining flexible and adaptable rather than rigidly attached to one path`
};

const ReadingResult = () => {
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
    }
  };
  
  return (
    <motion.section 
      className="reading-result"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="reading-header" variants={itemVariants}>
        <h1>{formatReadingType(mockReading.readingType)}</h1>
        <div className="reading-meta">
          <div className="reading-date">
            <span>Date:</span> {formatDate(mockReading.createdAt)}
          </div>
          <div className="reading-tokens">
            <span>Tokens:</span> {mockReading.tokensSpent}
          </div>
        </div>
        <div className="reading-question">
          <h3>Your Question:</h3>
          <p>"{mockReading.question}"</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="reading-cards"
        variants={itemVariants}
      >
        {mockReading.cards.map((card, index) => (
          <motion.div 
            key={index} 
            className="reading-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <TarotCard 
              card={card} 
              isReversed={card.isReversed} 
            />
            <div className="card-position">{card.position}</div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="reading-interpretation"
        variants={itemVariants}
      >
        <h2>Your Reading</h2>
        <div className="interpretation-text">
          {mockReading.interpretation.split('\n\n').map((paragraph, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="reading-actions"
        variants={itemVariants}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/new-reading" className="btn btn-primary">
            New Reading
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/history" className="btn btn-secondary">
            View History
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ReadingResult;
