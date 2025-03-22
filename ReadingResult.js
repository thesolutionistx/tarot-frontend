import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import TarotCard from './tarot/TarotCard';

const ReadingResult = ({ auth: { user } }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [readingInsight, setReadingInsight] = useState('');

  // Mock data for demonstration
  const mockCards = [
    {
      id: 1,
      name: 'The Fool',
      position: 'Present',
      image: '/images/cards/the-fool.jpg',
      isReversed: false,
      meaning: 'Fresh starts, new adventures, and a leap of faith. Trust the Universe and take that risk—your spirit guides have your back!',
      affirmation: 'I embrace new beginnings with confidence and joy.'
    },
    {
      id: 2,
      name: 'The Star',
      position: 'Future',
      image: '/images/cards/the-star.jpg',
      isReversed: false,
      meaning: 'Hope, healing, and divine alignment. Your manifestations are coming—keep the faith.',
      affirmation: 'I am guided, blessed, and inspired.'
    },
    {
      id: 3,
      name: 'The Tower',
      position: 'Past',
      image: '/images/cards/the-tower.jpg',
      isReversed: true,
      meaning: 'Avoiding disaster, fear of change, delaying the inevitable.',
      affirmation: 'I embrace necessary change for my highest good.'
    }
  ];

  const mockInsight = "Your reading reveals a journey of transformation. The reversed Tower in your past suggests you've been resisting necessary changes, perhaps holding onto situations or relationships that no longer serve your highest good. The Fool in your present position indicates you're now at a point of new beginnings, ready to take a leap of faith into the unknown. This is a powerful time to trust your intuition and embrace fresh opportunities without the burden of past expectations. The Star in your future position is a beautiful sign of hope and divine guidance. After the courage of your current leap, you'll find yourself in alignment with your true purpose, experiencing healing and renewed faith. This spread encourages you to release old patterns, embrace the adventure of the present moment, and trust that the universe is guiding you toward a period of hope and inspiration.";

  useEffect(() => {
    // Simulate API call to get reading results
    setTimeout(() => {
      setCards(mockCards);
      setReadingInsight(mockInsight);
      setLoading(false);
    }, 1500);
    
    // Create mystical background elements
    const createMysticalBackground = () => {
      if (typeof window !== 'undefined') {
        const mysticalBg = document.createElement('div');
        mysticalBg.className = 'mystical-bg';
        document.body.appendChild(mysticalBg);
        
        // Create stars
        for (let i = 0; i < 30; i++) {
          const star = document.createElement('div');
          star.className = 'mystical-star';
          star.style.width = `${Math.random() * 3 + 1}px`;
          star.style.height = star.style.width;
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          star.style.animationDelay = `${Math.random() * 4}s`;
          mysticalBg.appendChild(star);
        }
        
        // Create mystical circles
        for (let i = 0; i < 2; i++) {
          const circle = document.createElement('div');
          circle.className = 'mystical-circle';
          const size = Math.random() * 300 + 200;
          circle.style.width = `${size}px`;
          circle.style.height = `${size}px`;
          circle.style.left = `${Math.random() * 100}%`;
          circle.style.top = `${Math.random() * 100}%`;
          circle.style.animationDuration = `${Math.random() * 60 + 30}s`;
          mysticalBg.appendChild(circle);
        }
      }
    };
    
    createMysticalBackground();
    
    return () => {
      // Clean up mystical background on unmount
      if (typeof window !== 'undefined') {
        const mysticalBg = document.querySelector('.mystical-bg');
        if (mysticalBg) {
          mysticalBg.remove();
        }
      }
    };
  }, []);

  const handleCardClick = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const cardVariants = {
    hidden: { rotateY: 180, opacity: 0 },
    visible: i => ({ 
      rotateY: 0, 
      opacity: 1, 
      transition: { 
        delay: i * 0.5,
        duration: 0.8,
        type: "spring",
        stiffness: 50
      } 
    })
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary-darker">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-cinzel text-accent-gold">Consulting the cards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary-darker">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-4 text-shadow-gold">
              Your Reading
            </h1>
            <p className="text-xl font-cormorant text-white/90">
              The cards have revealed their wisdom. Reflect on their message with an open heart.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass-panel p-6 md:p-8 mb-10"
            variants={itemVariants}
          >
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
              {cards.map((card, index) => (
                <motion.div 
                  key={card.id}
                  custom={index}
                  variants={cardVariants}
                  className="relative perspective"
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className={`w-48 h-72 cursor-pointer transform-style-3d transition-all duration-700 ${activeCard === card.id ? 'rotate-y-180' : ''}`}>
                    <div className="absolute w-full h-full backface-visibility-hidden rounded-xl overflow-hidden border-4 border-accent-gold shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-card-bg-light to-card-bg-dark"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <h3 className="font-cinzel text-primary-dark text-lg font-bold mb-2">{card.name}</h3>
                        <div className="w-24 h-24 mb-3">
                          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="80" height="80" rx="3" stroke="#2c003e" strokeWidth="2" />
                            {card.name === 'The Fool' && (
                              <>
                                <circle cx="50" cy="30" r="10" stroke="#2c003e" strokeWidth="1.5" />
                                <path d="M30 70L50 40L70 70" stroke="#2c003e" strokeWidth="1.5" />
                              </>
                            )}
                            {card.name === 'The Star' && (
                              <>
                                <path d="M50 20L55 40H75L60 55L65 75L50 60L35 75L40 55L25 40H45L50 20Z" stroke="#2c003e" strokeWidth="1.5" />
                              </>
                            )}
                            {card.name === 'The Tower' && (
                              <>
                                <path d="M35 20H65V70H35V20Z" stroke="#2c003e" strokeWidth="1.5" />
                                <path d="M35 20L50 10L65 20" stroke="#2c003e" strokeWidth="1.5" />
                                <path d="M30 70H70" stroke="#2c003e" strokeWidth="1.5" />
                                <path d="M45 40L55 50M55 40L45 50" stroke="#2c003e" strokeWidth="1.5" />
                              </>
                            )}
                          </svg>
                        </div>
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 bg-primary-dark/20 text-primary-dark rounded-full text-xs font-medium">
                            {card.position}
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
                          <p>{card.meaning}</p>
                        </div>
                        <div className="text-primary-dark text-sm mt-auto">
                          <strong className="block mb-1">Affirmation:</strong>
                          <p className="italic">"{card.affirmation}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    className="mt-2 text-center text-accent-gold text-sm font-cinzel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.5 + 0.8 }}
                  >
                    Click to reveal
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-10"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-cinzel font-bold mb-4 text-accent-gold">Reading Insight</h2>
              <div className="bg-white/5 border border-accent-gold/20 rounded-lg p-6">
                <p className="text-white/90 font-cormorant text-lg leading-relaxed">
                  {readingInsight}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex justify-center gap-4"
              variants={itemVariants}
            >
              <motion.a 
                href="/reading" 
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                New Reading
              </motion.a>
              <motion.a 
                href="/dashboard" 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Return to Dashboard
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="mt-10 flex justify-center opacity-30"
            variants={itemVariants}
          >
            <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 25H200" stroke="#FFD700" strokeWidth="1" />
              <path d="M100 0L100 50" stroke="#FFD700" strokeWidth="1" />
              <circle cx="100" cy="25" r="8" stroke="#FFD700" strokeWidth="1" />
              <path d="M20 25L40 15V35L20 25Z" stroke="#FFD700" strokeWidth="1" />
              <path d="M180 25L160 15V35L180 25Z" stroke="#FFD700" strokeWidth="1" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

ReadingResult.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ReadingResult);
