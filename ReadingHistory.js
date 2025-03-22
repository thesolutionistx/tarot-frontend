import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from './Navbar';

const ReadingHistory = ({ auth: { user, loading } }) => {
  const [readings, setReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for demonstration
  const mockReadings = [
    {
      id: 1,
      date: 'March 20, 2025',
      type: 'Past-Present-Future',
      question: 'What path should I take in my career?',
      cards: ['The Hermit', 'The Chariot', 'Ten of Cups'],
      summary: 'A period of reflection leads to determined progress, ultimately resulting in emotional fulfillment.'
    },
    {
      id: 2,
      date: 'March 15, 2025',
      type: 'Single Card',
      question: 'What energy surrounds me today?',
      cards: ['The Star'],
      summary: 'A day of hope, inspiration, and spiritual alignment. Trust in divine timing.'
    },
    {
      id: 3,
      date: 'March 10, 2025',
      type: 'Celtic Cross',
      question: 'How can I improve my relationship?',
      cards: ['Two of Cups', 'The Tower', 'The Lovers', 'Four of Swords', 'Knight of Wands', 'Nine of Pentacles', 'The Empress', 'Eight of Swords', 'The Sun', 'Judgment'],
      summary: 'A strong foundation exists, but unexpected changes require careful communication and patience. Taking time for self-reflection will lead to passionate renewal and eventual harmony.'
    },
    {
      id: 4,
      date: 'March 5, 2025',
      type: 'Five Card Cross',
      question: 'What should I focus on for personal growth?',
      cards: ['Page of Wands', 'Seven of Pentacles', 'The Magician', 'Three of Cups', 'Ace of Swords'],
      summary: 'Embrace new learning opportunities and be patient with your progress. You have all the tools you need to succeed, especially with the support of friends and clear communication.'
    }
  ];

  useEffect(() => {
    // Simulate API call to get reading history
    setTimeout(() => {
      setReadings(mockReadings);
      setIsLoading(false);
    }, 1000);
    
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: i => ({ 
      y: 0, 
      opacity: 1, 
      transition: { 
        delay: i * 0.2,
        duration: 0.5
      } 
    }),
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary-darker">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-cinzel text-accent-gold">Retrieving your mystical journey...</p>
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
              Your Reading History
            </h1>
            <p className="text-xl font-cormorant text-white/90">
              Revisit the wisdom the cards have shared on your journey
            </p>
          </motion.div>
          
          {readings.length === 0 ? (
            <motion.div 
              className="glass-panel p-8 text-center"
              variants={itemVariants}
            >
              <div className="w-20 h-20 mx-auto mb-6 opacity-60">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="15" width="60" height="80" rx="3" stroke="#FFD700" strokeWidth="2" />
                  <rect x="30" y="25" width="40" height="60" rx="2" stroke="#FFD700" strokeWidth="1.5" />
                  <path d="M50 35L55 45H45L50 35Z" stroke="#FFD700" strokeWidth="1.5" />
                  <path d="M50 75L45 65H55L50 75Z" stroke="#FFD700" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-cinzel font-bold mb-4 text-accent-gold">No Readings Yet</h3>
              <p className="text-white/80 mb-8">
                Your mystical journey has yet to begin. Start your first reading to see your history here.
              </p>
              <Link href="/reading">
                <a className="btn-primary">Begin Your First Reading</a>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {readings.map((reading, index) => (
                <motion.div 
                  key={reading.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="glass-panel p-6 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="md:w-1/4">
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <h3 className="font-cinzel text-accent-gold text-lg font-bold mb-1">{reading.type}</h3>
                        <p className="text-white/70 text-sm">{reading.date}</p>
                      </div>
                    </div>
                    
                    <div className="md:w-3/4">
                      <div className="mb-4">
                        <h4 className="font-cinzel text-white text-lg mb-2">Question:</h4>
                        <p className="text-white/90 italic">"{reading.question}"</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-cinzel text-white text-lg mb-2">Cards:</h4>
                        <div className="flex flex-wrap gap-2">
                          {reading.cards.map((card, i) => (
                            <span key={i} className="inline-block px-3 py-1 bg-accent-gold/20 text-accent-gold rounded-full text-sm">
                              {card}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-cinzel text-white text-lg mb-2">Summary:</h4>
                        <p className="text-white/90">{reading.summary}</p>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <motion.button
                          className="text-accent-gold hover:text-accent-gold-light transition-colors flex items-center"
                          whileHover={{ x: 5 }}
                        >
                          View Full Reading
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                className="flex justify-center mt-10"
                variants={itemVariants}
              >
                <Link href="/reading">
                  <a className="btn-primary">New Reading</a>
                </Link>
              </motion.div>
            </div>
          )}
          
          {/* Decorative element */}
          <motion.div 
            className="mt-16 flex justify-center opacity-30"
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

ReadingHistory.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ReadingHistory);
