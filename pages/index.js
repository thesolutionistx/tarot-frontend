import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import TarotCard from '../components/TarotCard';
import Link from 'next/link';

const tarotCards = [
  {
    id: 1,
    name: "The Fool",
    meaning: "New beginnings, innocence, spontaneity, taking risks"
  },
  {
    id: 2,
    name: "The Magician",
    meaning: "Manifestation, resourcefulness, power, inspiration"
  },
  {
    id: 3,
    name: "The High Priestess",
    meaning: "Intuition, mystery, spirituality, higher knowledge"
  },
  {
    id: 4,
    name: "The Empress",
    meaning: "Fertility, nurturing, creativity, abundance"
  },
  {
    id: 5,
    name: "The Emperor",
    meaning: "Authority, structure, control, fatherhood"
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

  const flipCard = (cardId) => {
    setFlippedCards(prev => [...prev, cardId]);
  };

  return (
    <Layout>
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-mystical text-gold mb-6"
        >
          Welcome, Seeker
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Your mystical journey awaits. What secrets will the cards reveal today?
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {welcomeCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="bg-[#3A005F] rounded-xl p-6 flex flex-col"
          >
            <h2 className="text-2xl font-mystical text-gold mb-4">{card.title}</h2>
            <p className="text-gray-300 mb-6 flex-grow">{card.description}</p>
            <Link href={card.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gold text-[#2B004A] font-bold py-3 px-6 rounded-lg hover:bg-[#F7D001] transition-colors"
              >
                {card.buttonText}
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-4xl text-gold/50"
        >
          ✧
        </motion.div>
      </div>
    </Layout>
  );
} 