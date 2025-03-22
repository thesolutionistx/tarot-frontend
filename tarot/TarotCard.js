import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TarotCard = ({ card, index, onClick, isActive }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  useEffect(() => {
    // Reset flip state when active card changes
    if (!isActive) {
      setIsFlipped(false);
    }
  }, [isActive]);
  
  const handleClick = () => {
    if (isActive) {
      setIsFlipped(!isFlipped);
    }
    onClick(card.id);
  };
  
  const cardVariants = {
    hidden: { 
      rotateY: 180, 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      rotateY: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        delay: index * 0.3,
        duration: 0.8,
        type: "spring",
        stiffness: 50
      } 
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div 
      className={`relative perspective ${isActive ? 'z-10' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!isActive ? "hover" : {}}
      onClick={handleClick}
    >
      <div className={`w-48 h-72 cursor-pointer transform-style-3d transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-visibility-hidden rounded-xl overflow-hidden border-4 border-accent-gold shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-card-bg-light to-card-bg-dark"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <h3 className="font-cinzel text-primary-dark text-lg font-bold mb-2">{card.name}</h3>
            <div className="w-24 h-24 mb-3">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="80" height="80" rx="3" stroke="#2c003e" strokeWidth="2" />
                {/* Dynamic SVG content based on card name */}
                {card.name === 'The Fool' && (
                  <>
                    <circle cx="50" cy="30" r="10" stroke="#2c003e" strokeWidth="1.5" />
                    <path d="M30 70L50 40L70 70" stroke="#2c003e" strokeWidth="1.5" />
                  </>
                )}
                {card.name === 'The Magician' && (
                  <>
                    <circle cx="50" cy="30" r="10" stroke="#2c003e" strokeWidth="1.5" />
                    <path d="M50 45V70" stroke="#2c003e" strokeWidth="1.5" />
                    <path d="M35 55H65" stroke="#2c003e" strokeWidth="1.5" />
                  </>
                )}
                {card.name === 'The High Priestess' && (
                  <>
                    <circle cx="50" cy="25" r="10" stroke="#2c003e" strokeWidth="1.5" />
                    <path d="M40 40V70" stroke="#2c003e" strokeWidth="1.5" />
                    <path d="M60 40V70" stroke="#2c003e" strokeWidth="1.5" />
                    <path d="M40 55H60" stroke="#2c003e" strokeWidth="1.5" />
                  </>
                )}
                {/* Default symbol for other cards */}
                {!['The Fool', 'The Magician', 'The High Priestess'].includes(card.name) && (
                  <>
                    <circle cx="50" cy="50" r="25" stroke="#2c003e" strokeWidth="1.5" />
                    <path d="M35 50H65" stroke="#2c003e" strokeWidth="1.5" />
                    <path d="M50 35V65" stroke="#2c003e" strokeWidth="1.5" />
                  </>
                )}
              </svg>
            </div>
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-primary-dark/20 text-primary-dark rounded-full text-xs font-medium">
                {card.position || 'Arcana'}
              </span>
            </div>
            {card.isReversed && (
              <div className="absolute top-2 right-2 text-xs font-medium text-red-600">
                Reversed
              </div>
            )}
          </div>
        </div>
        <div className="absolute w-full h-full backface-visibility-hidden rounded-xl overflow-hidden border-4 border-red-500 shadow-xl rotate-y-180">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-gold to-accent-red"></div>
          <div className="absolute inset-0 flex flex-col p-4 overflow-auto">
            <h3 className="font-cinzel text-primary-dark text-lg font-bold mb-2 text-center">{card.name}</h3>
            <div className="text-primary-dark text-sm mb-2">
              <strong className="block mb-1">Meaning:</strong>
              <p>{card.meaning || 'The meaning will be revealed in your reading.'}</p>
            </div>
            <div className="text-primary-dark text-sm mt-auto">
              <strong className="block mb-1">Affirmation:</strong>
              <p className="italic">"{card.affirmation || 'Trust in the wisdom of the cards.'}"</p>
            </div>
          </div>
        </div>
      </div>
      {isActive && (
        <motion.div 
          className="mt-2 text-center text-accent-gold text-sm font-cinzel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Click to {isFlipped ? 'hide' : 'reveal'}
        </motion.div>
      )}
    </motion.div>
  );
};

TarotCard.propTypes = {
  card: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default TarotCard;
