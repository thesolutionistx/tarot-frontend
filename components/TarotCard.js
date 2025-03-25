import { motion } from 'framer-motion';

export default function TarotCard({ card, isFlipped, onClick, position = 0, total = 1 }) {
  // Calculate the rotation and offset based on the spread type
  const getSpreadStyles = () => {
    if (total === 1) return {};
    
    if (total === 3) {
      // Past-Present-Future spread
      const rotation = (position - 1) * 15;
      const translateX = (position - 1) * 20;
      return {
        transform: `rotate(${rotation}deg) translateX(${translateX}px)`
      };
    }
    
    if (total === 5) {
      // Cross spread
      if (position === 2) return { transform: 'translateY(-50%)' };
      if (position === 3) return { transform: 'translateX(-50%)' };
      if (position === 4) return { transform: 'translateX(50%)' };
      if (position === 5) return { transform: 'translateY(50%)' };
    }
    
    // Default circular arrangement for other spreads
    const angle = (360 / total) * position;
    const radius = 100;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return {
      transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`
    };
  };

  return (
    <motion.div
      className="relative h-[400px] cursor-pointer perspective-1000"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.1 }}
      style={getSpreadStyles()}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-lighter to-purple-dark rounded-xl border-2 border-gold shadow-lg p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-xl font-mystical text-gold">Click to Reveal</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-dark to-black rounded-xl border-2 border-gold shadow-lg p-6 rotate-y-180">
          <div className="text-center h-full flex flex-col justify-between">
            <h3 className="text-2xl font-mystical text-gold mb-4">{card.name}</h3>
            
            <div className="flex-grow flex items-center justify-center">
              <div className="text-8xl mb-4">
                {card.id === 'fool' && '🃏'}
                {card.id === 'magician' && '✨'}
                {card.id === 'priestess' && '🌙'}
                {card.id === 'empress' && '👑'}
                {card.id === 'emperor' && '⚔️'}
                {card.id === 'hierophant' && '🏛️'}
                {card.id === 'lovers' && '❤️'}
                {card.id === 'chariot' && '🏃'}
                {card.id === 'strength' && '🦁'}
                {card.id === 'hermit' && '🕯️'}
              </div>
            </div>
            
            <p className="text-gray-300 text-sm">{card.meaning}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 