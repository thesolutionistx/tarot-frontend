import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';

// Mock data for readings history
const mockReadings = [
  {
    id: 1,
    date: '2024-03-24',
    spreadType: 'Past-Present-Future',
    question: 'What path should I take in my career?',
    cards: ['The Magician', 'The Chariot', 'Ten of Cups'],
    summary: 'Your past shows mastery of skills. The present indicates forward momentum and determination. The future suggests emotional fulfillment and success.'
  },
  {
    id: 2,
    date: '2024-03-23',
    spreadType: 'Single Card',
    question: 'What energy surrounds my relationship?',
    cards: ['The Lovers'],
    summary: 'The Lovers card suggests harmony and alignment in your relationship, with important choices ahead.'
  },
  {
    id: 3,
    date: '2024-03-22',
    spreadType: 'Celtic Cross',
    question: 'How can I achieve better work-life balance?',
    cards: ['The Hermit', 'Strength', 'The High Priestess', 'The Emperor', 'The Star', 'The Sun', 'The Moon', 'The World', 'The Fool', 'Judgment'],
    summary: 'The reading suggests a period of introspection leading to personal growth and eventual balance.'
  }
];

export default function History() {
  const [readings] = useState(mockReadings);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-mystical text-gold mb-4">Your Reading History</h1>
          <p className="text-gray-300">
            Revisit the wisdom the cards have shared on your journey.
          </p>
        </motion.div>

        <div className="space-y-6">
          {readings.map((reading, index) => (
            <motion.div
              key={reading.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-panel"
            >
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="px-3 py-1 bg-purple-darker rounded-full text-sm text-gold border border-gold/20">
                    {reading.spreadType}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(reading.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <h3 className="text-xl text-gold mb-4">"{reading.question}"</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {reading.cards.map((card, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-darker rounded-full text-sm text-white border border-gold/20"
                  >
                    {card}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 mb-4">{reading.summary}</p>

              <div className="flex justify-end">
                <Link
                  href={`/reading/${reading.id}`}
                  className="text-gold hover:text-[#F7D001] transition-colors"
                >
                  View Full Reading →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/reading">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              New Reading
            </motion.button>
          </Link>
        </div>
      </div>
    </Layout>
  );
} 