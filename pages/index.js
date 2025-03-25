import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import TarotCard from '../components/TarotCard';
import Link from 'next/link';

const tarotCards = [
  {
    id: 1,
    name: 'The Moon',
    meaning: 'Intuition, mystery, and the subconscious mind. Trust your inner voice and embrace the unknown.'
  },
  {
    id: 2,
    name: 'The Sun',
    meaning: 'Joy, success, and vitality. A time of growth and positive energy.'
  },
  {
    id: 3,
    name: 'The Star',
    meaning: 'Hope, inspiration, and serenity. Believe in your dreams and maintain faith.'
  },
  {
    id: 4,
    name: 'The Tower',
    meaning: 'Sudden change, revelation, and upheaval. Embrace transformation and new beginnings.'
  },
  {
    id: 5,
    name: 'The Fool',
    meaning: 'New beginnings, innocence, and spontaneity. Take a leap of faith and trust the journey.'
  }
];

const welcomeCards = [
  {
    title: "Tarot Reading",
    description: "Begin your mystical journey with a personalized tarot reading. Let the cards guide you through life's questions.",
    buttonText: "Begin Reading",
    link: "/reading"
  },
  {
    title: "Reading History",
    description: "Explore your past readings and reflect on the wisdom the cards have shared throughout your journey.",
    buttonText: "View History",
    link: "/history"
  },
  {
    title: "Token Store",
    description: "Purchase additional tokens to continue your spiritual journey and unlock special reading spreads.",
    buttonText: "Visit Store",
    link: "/tokens"
  }
];

export default function Home() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isReading, setIsReading] = useState(false);

  const startReading = () => {
    // Shuffle and select 3 cards
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    setSelectedCards(shuffled.slice(0, 3));
    setFlippedCards([]);
    setIsReading(true);
  };

  const flipCard = (index) => {
    setFlippedCards(prev => [...prev, index]);
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {!isReading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 sm:py-16"
          >
            <h1 className="text-3xl sm:text-5xl font-mystical text-gold mb-4 sm:mb-6">
              Welcome to Tarot Insights
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Discover your destiny through the ancient wisdom of the cards. 
              Each reading offers unique insights and guidance for your journey.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startReading}
              className="bg-gradient-to-r from-purple-dark to-purple-darker text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-mystical text-lg sm:text-xl border border-gold/20 hover:border-gold/40 transition-colors shadow-lg hover:shadow-xl"
            >
              Begin Your Reading
            </motion.button>
          </motion.div>
        ) : (
          <div className="py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-8 mb-8 sm:mb-12">
              {selectedCards.map((card, index) => (
                <TarotCard
                  key={card.id}
                  card={card}
                  isFlipped={flippedCards.includes(index)}
                  onClick={() => flipCard(index)}
                  position={index}
                  total={selectedCards.length}
                />
              ))}
            </div>
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsReading(false)}
                className="bg-gradient-to-r from-purple-dark to-purple-darker text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-mystical text-lg sm:text-xl border border-gold/20 hover:border-gold/40 transition-colors shadow-lg hover:shadow-xl"
              >
                Start New Reading
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 