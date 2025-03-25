import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import TarotCard from '../components/TarotCard';

const readingTypes = [
  { id: 'general', name: 'General Guidance' },
  { id: 'love', name: 'Love & Relationships' },
  { id: 'career', name: 'Career & Finances' },
  { id: 'spiritual', name: 'Spiritual Growth' }
];

const spreadTypes = [
  { id: 'single', name: 'Single Card', cards: 1 },
  { id: 'past-present-future', name: 'Past-Present-Future', cards: 3 },
  { id: 'cross', name: 'Five Card Cross', cards: 5 },
  { id: 'chakra', name: 'Chakra Spread', cards: 7 },
  { id: 'celtic', name: 'Celtic Cross', cards: 10 }
];

const tarotCards = [
  { id: 'fool', name: 'The Fool', meaning: 'New beginnings, spontaneity, faith, apparent foolishness' },
  { id: 'magician', name: 'The Magician', meaning: 'Power, skill, concentration, action, resourcefulness' },
  { id: 'priestess', name: 'The High Priestess', meaning: 'Intuition, higher powers, mystery, subconscious mind' },
  { id: 'empress', name: 'The Empress', meaning: 'Fertility, femininity, beauty, nature, abundance' },
  { id: 'emperor', name: 'The Emperor', meaning: 'Authority, father-figure, structure, solid foundation' },
  { id: 'hierophant', name: 'The Hierophant', meaning: 'Religion, group identification, conformity, tradition, beliefs' },
  { id: 'lovers', name: 'The Lovers', meaning: 'Love, harmony, relationships, values alignment, choices' },
  { id: 'chariot', name: 'The Chariot', meaning: 'Triumph, victory, overcoming obstacles, strong will' },
  { id: 'strength', name: 'Strength', meaning: 'Patience, compassion, soft control, inner strength' },
  { id: 'hermit', name: 'The Hermit', meaning: 'Soul-searching, introspection, being alone, inner guidance' }
];

export default function Reading() {
  const [question, setQuestion] = useState('');
  const [readingType, setReadingType] = useState('');
  const [spreadType, setSpreadType] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  const startReading = () => {
    if (!question || !readingType || !spreadType) return;

    const spread = spreadTypes.find(s => s.id === spreadType);
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    setSelectedCards(shuffled.slice(0, spread.cards));
    setFlippedCards([]);
    setIsReading(true);
  };

  const flipCard = (cardId) => {
    setFlippedCards(prev => [...prev, cardId]);
  };

  return (
    <Layout>
      {!isReading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto card-panel"
        >
          <h1 className="text-3xl font-mystical text-gold mb-6">Tarot Reading</h1>
          <p className="text-gray-300 mb-8">
            Focus your energy and intention as you prepare to receive guidance from the cards.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-gold mb-2">What question seeks an answer?</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="input-field h-32"
                placeholder="Enter your question..."
              />
            </div>

            <div>
              <label className="block text-gold mb-2">Choose your reading type</label>
              <div className="radio-group">
                {readingTypes.map((type) => (
                  <label key={type.id} className="radio-option">
                    <input
                      type="radio"
                      name="readingType"
                      value={type.id}
                      checked={readingType === type.id}
                      onChange={(e) => setReadingType(e.target.value)}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${readingType === type.id ? 'bg-gold border-gold' : 'border-gold/50'}`} />
                    <span>{type.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gold mb-2">Select your spread</label>
              <div className="radio-group">
                {spreadTypes.map((type) => (
                  <label key={type.id} className="radio-option">
                    <input
                      type="radio"
                      name="spreadType"
                      value={type.id}
                      checked={spreadType === type.id}
                      onChange={(e) => setSpreadType(e.target.value)}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${spreadType === type.id ? 'bg-gold border-gold' : 'border-gold/50'}`} />
                    <span>{type.name} ({type.cards} cards)</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={startReading}
              disabled={!question || !readingType || !spreadType}
              className={`w-full btn-primary ${(!question || !readingType || !spreadType) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Reveal the Cards
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-mystical text-gold mb-4">Your Reading</h2>
            <p className="text-gray-300">{question}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {selectedCards.map((card, index) => (
              <TarotCard
                key={card.id}
                card={card}
                isFlipped={flippedCards.includes(card.id)}
                onClick={() => flipCard(card.id)}
                position={index}
                total={selectedCards.length}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setIsReading(false)}
              className="btn-outline"
            >
              New Reading
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
} 