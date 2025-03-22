// src/components/tarot/TarotCard.js
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const TarotCard = ({ card, isReversed, onClick, isSelectable = false }) => {
  const cardVariants = {
    initial: { 
      rotateY: 180,
      y: 0
    },
    animate: { 
      rotateY: 0,
      y: isReversed ? [0, -20, 0] : 0,
      transition: { 
        duration: 0.8,
        y: { delay: 0.8, duration: 0.5 }
      }
    },
    hover: {
      y: isSelectable ? -15 : 0,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div 
      className={`tarot-card ${isReversed ? 'reversed' : ''} ${isSelectable ? 'selectable' : ''}`}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={cardVariants}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-back">
          <div className="card-back-design"></div>
        </div>
        <div className="card-front">
          <img 
            src={`/images/cards/${card.image}`} 
            alt={card.name} 
            className="card-image"
          />
          <div className="card-name">{card.name}</div>
        </div>
      </div>
    </motion.div>
  );
};

TarotCard.propTypes = {
  card: PropTypes.object.isRequired,
  isReversed: PropTypes.bool,
  onClick: PropTypes.func,
  isSelectable: PropTypes.bool
};

export default TarotCard;
