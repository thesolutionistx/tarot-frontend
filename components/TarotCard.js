import { motion } from 'framer-motion';

export default function TarotCard({ card, isFlipped, onClick, position, total }) {
  const getSpreadStyles = () => {
    if (!position || !total) return {};
    
    const spreadTypes = {
      1: { rotation: 0, translateX: 0 },
      3: {
        0: { rotation: -15, translateX: -100 },
        1: { rotation: 0, translateX: 0 },
        2: { rotation: 15, translateX: 100 }
      },
      5: {
        0: { rotation: -30, translateX: -200 },
        1: { rotation: -15, translateX: -100 },
        2: { rotation: 0, translateX: 0 },
        3: { rotation: 15, translateX: 100 },
        4: { rotation: 30, translateX: 200 }
      }
    };

    return spreadTypes[total]?.[position] || {};
  };

  const spreadStyles = getSpreadStyles();

  return (
    <motion.div
      className="relative w-64 h-96 cursor-pointer perspective-1000"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateY: spreadStyles.rotation || 0,
        x: spreadStyles.translateX || 0
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-darker to-purple-dark">
            <div className="absolute inset-0 bg-[url('/card-pattern.png')] opacity-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">✨</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="text-center text-gold font-mystical text-lg">
                Click to Reveal
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden rotate-y-180">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-dark to-purple-darker">
            <div className="absolute inset-0 bg-[url('/card-pattern.png')] opacity-10"></div>
            <div className="absolute inset-0 p-6 flex flex-col">
              <div className="text-4xl mb-4">{getCardEmoji(card.id)}</div>
              <h3 className="text-2xl font-mystical text-gold mb-4">{card.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{card.meaning}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="text-center text-gold/80 font-mystical text-sm">
                Position {position + 1} of {total}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function getCardEmoji(cardId) {
  const emojis = {
    1: '🌙', // The Moon
    2: '☀️', // The Sun
    3: '⭐', // The Star
    4: '🌠', // The Tower
    5: '🎭', // The Fool
    // Add more card emojis as needed
  };
  return emojis[cardId] || '✨';
} 