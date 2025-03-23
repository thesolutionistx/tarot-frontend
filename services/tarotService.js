import axios from 'axios';
import { createSystemPrompt, createUserPrompt } from './gptService';

// OpenAI API client for tarot readings
export const generateTarotReading = async (question, cards) => {
  try {
    // Format cards for prompt
    const formattedCards = cards.map(card => {
      return `${card.name}${card.isReversed ? ' (Reversed)' : ''} in the ${card.position} position`;
    }).join(', ');
    
    // Create prompts
    const systemPrompt = createSystemPrompt();
    const userPrompt = createUserPrompt(question, formattedCards);
    
    // Make API call to backend
    const response = await axios.post('/api/readings/generate', {
      question,
      cards,
      readingType: cards.length === 1 ? 'single-card' : 
                  cards.length === 3 ? 'three-card' : 
                  cards.length === 5 ? 'five-card-cross' : 'celtic-cross'
    });
    
    return response.data.reading.interpretation;
  } catch (error) {
    console.error('Error generating tarot reading:', error);
    throw error;
  }
};

// Get tarot card data
export const getTarotCards = async () => {
  try {
    const response = await axios.get('/api/tarot/cards');
    return response.data.cards;
  } catch (error) {
    console.error('Error fetching tarot cards:', error);
    
    // Fallback to local data if API fails
    return getMajorArcana();
  }
};

// Fallback function to get major arcana cards
export const getMajorArcana = () => {
  return [
    { id: 0, name: 'The Fool', image: '/cards/fool.jpg' },
    { id: 1, name: 'The Magician', image: '/cards/magician.jpg' },
    { id: 2, name: 'The High Priestess', image: '/cards/high_priestess.jpg' },
    { id: 3, name: 'The Empress', image: '/cards/empress.jpg' },
    { id: 4, name: 'The Emperor', image: '/cards/emperor.jpg' },
    { id: 5, name: 'The Hierophant', image: '/cards/hierophant.jpg' },
    { id: 6, name: 'The Lovers', image: '/cards/lovers.jpg' },
    { id: 7, name: 'The Chariot', image: '/cards/chariot.jpg' },
    { id: 8, name: 'Strength', image: '/cards/strength.jpg' },
    { id: 9, name: 'The Hermit', image: '/cards/hermit.jpg' },
    { id: 10, name: 'Wheel of Fortune', image: '/cards/wheel_of_fortune.jpg' },
    { id: 11, name: 'Justice', image: '/cards/justice.jpg' },
    { id: 12, name: 'The Hanged Man', image: '/cards/hanged_man.jpg' },
    { id: 13, name: 'Death', image: '/cards/death.jpg' },
    { id: 14, name: 'Temperance', image: '/cards/temperance.jpg' },
    { id: 15, name: 'The Devil', image: '/cards/devil.jpg' },
    { id: 16, name: 'The Tower', image: '/cards/tower.jpg' },
    { id: 17, name: 'The Star', image: '/cards/star.jpg' },
    { id: 18, name: 'The Moon', image: '/cards/moon.jpg' },
    { id: 19, name: 'The Sun', image: '/cards/sun.jpg' },
    { id: 20, name: 'Judgement', image: '/cards/judgement.jpg' },
    { id: 21, name: 'The World', image: '/cards/world.jpg' }
  ];
};

// Draw random cards for a reading
export const drawRandomCards = (count) => {
  const cards = getMajorArcana();
  const drawnCards = [];
  const usedIndices = new Set();
  
  // Define positions based on count
  let positions;
  if (count === 1) {
    positions = ['Present'];
  } else if (count === 3) {
    positions = ['Past', 'Present', 'Future'];
  } else if (count === 5) {
    positions = ['Center', 'Above', 'Below', 'Past', 'Future'];
  } else if (count === 10) {
    positions = [
      'Present', 'Challenge', 'Past', 'Future', 'Above', 
      'Below', 'Advice', 'External', 'Hopes/Fears', 'Outcome'
    ];
  } else {
    throw new Error(`Unsupported card count: ${count}`);
  }
  
  // Draw random cards
  for (let i = 0; i < count; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * cards.length);
    } while (usedIndices.has(randomIndex));
    
    usedIndices.add(randomIndex);
    
    drawnCards.push({
      ...cards[randomIndex],
      position: positions[i],
      isReversed: Math.random() > 0.7 // 30% chance of reversed card
    });
  }
  
  return drawnCards;
};
