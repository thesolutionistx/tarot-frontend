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
  const [selectedSpread, setSelectedSpread] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  const startReading = () => {
    if (!question || !selectedType || !selectedSpread) return;

    const spread = spreadTypes.find(s => s.id === selectedSpread);
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
      <div className="max-w-4xl mx-auto">
        {!isReading ? (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-mystical text-gold mb-4">Get Your Reading</h1>
              <p className="text-gray-300 text-lg">Ask your question and let the cards guide you</p>
            </motion.div>

            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2">Your Question</label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="input-field h-32 resize-none"
                  placeholder="What guidance do you seek?"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Reading Type</label>
                <div className="radio-group">
                  {readingTypes.map((type) => (
                    <label
                      key={type.id}
                      className={`radio-option ${selectedType === type.id ? 'border-gold' : ''}`}
                    >
                      <input
                        type="radio"
                        name="readingType"
                        value={type.id}
                        checked={selectedType === type.id}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="hidden"
                      />
                      {type.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Spread Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {spreadTypes.map((spread) => (
                    <label
                      key={spread.id}
                      className={`radio-option ${selectedSpread === spread.id ? 'border-gold' : ''}`}
                    >
                      <input
                        type="radio"
                        name="spreadType"
                        value={spread.id}
                        checked={selectedSpread === spread.id}
                        onChange={(e) => setSelectedSpread(e.target.value)}
                        className="hidden"
                      />
                      <div>
                        <div className="font-bold">{spread.name}</div>
                        <div className="text-sm text-gray-400">{spread.cards} cards</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={startReading}
                  disabled={!question || !selectedType || !selectedSpread}
                  className={`btn-primary w-full sm:w-auto ${
                    (!question || !selectedType || !selectedSpread) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Begin Reading
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-mystical text-gold mb-4">Your Reading</h2>
              <p className="text-gray-300 text-lg">{question}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                className="btn-outline w-full sm:w-auto"
              >
                New Reading
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 