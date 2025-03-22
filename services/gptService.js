// src/services/gptService.js
import axios from 'axios';

// This service handles the communication with the OpenAI API through our backend
export const generateTarotReading = async (readingData) => {
  try {
    // In a real implementation, this would call our backend API
    // which would then call the OpenAI API
    const response = await axios.post('/api/readings/generate', readingData);
    return response.data;
  } catch (error) {
    console.error('Error generating tarot reading:', error);
    throw error;
  }
};

// Format cards for GPT prompt
export const formatCardsForPrompt = (cards) => {
  return cards.map(card => {
    return `${card.name}${card.isReversed ? ' (Reversed)' : ''} in the ${card.position} position`;
  }).join(', ');
};

// Create system prompt for GPT
export const createSystemPrompt = () => {
  return `
    You are Psychic Tarot Andrew, a skilled Tarot reader who provides insightful, empathetic readings with spiritual guidance.
    You blend ancient symbolism with modern psychological insights.
    Your readings are detailed, personalized, and focused on empowerment rather than prediction.
    Interpret the cards in relation to the user's question, providing both traditional meanings and intuitive insights.
  `;
};

// Create user prompt for GPT
export const createUserPrompt = (question, formattedCards) => {
  return `
    The querent has asked: "${question}"
    
    They have drawn the following cards: ${formattedCards}
    
    Please provide a detailed tarot reading that interprets these cards in relation to their question.
    Include the symbolism of each card, how they relate to each other, and practical guidance.
    Your reading should be empathetic, insightful, and empowering.
  `;
};

// Mock GPT response for development/testing
export const mockGPTResponse = (question, cards) => {
  // This is a simplified mock response
  // In a real implementation, this would be replaced by the actual API call
  
  const cardMeanings = {
    'The Fool': 'new beginnings, spontaneity, and faith',
    'The Magician': 'manifestation, resourcefulness, and power',
    'The High Priestess': 'intuition, unconscious knowledge, and mystery',
    'The Empress': 'femininity, abundance, and nurturing',
    'The Emperor': 'authority, structure, and control',
    'The Hierophant': 'tradition, conformity, and spiritual guidance',
    'The Lovers': 'love, harmony, and choices',
    'The Chariot': 'determination, willpower, and victory',
    'Strength': 'courage, patience, and compassion',
    'The Hermit': 'introspection, solitude, and inner guidance',
    'Wheel of Fortune': 'change, cycles, and destiny',
    'Justice': 'fairness, truth, and law',
    'The Hanged Man': 'surrender, new perspective, and waiting',
    'Death': 'endings, change, and transformation',
    'Temperance': 'balance, moderation, and patience',
    'The Devil': 'shadow self, attachment, and restriction',
    'The Tower': 'sudden change, revelation, and awakening',
    'The Star': 'hope, faith, and inspiration',
    'The Moon': 'illusion, fear, and subconscious',
    'The Sun': 'positivity, success, and vitality',
    'Judgement': 'rebirth, inner calling, and absolution',
    'The World': 'completion, achievement, and fulfillment'
  };

  // Generate a mock reading based on the cards
  let reading = `Dear Seeker,\n\nThank you for sharing your question: "${question}"\n\n`;
  
  reading += `I've consulted the cards and received a powerful message for you.\n\n`;
  
  // Add interpretation for each card
  cards.forEach(card => {
    const cardName = card.name;
    const position = card.position;
    const isReversed = card.isReversed;
    
    reading += `In the ${position} position, you have ${cardName}${isReversed ? ' (Reversed)' : ''}. `;
    reading += `This card represents ${cardMeanings[cardName] || 'wisdom and guidance'}. `;
    
    if (isReversed) {
      reading += `When reversed, it suggests challenges or internal aspects of these energies. `;
    }
    
    reading += `In this position, it indicates that `;
    
    // Add position-specific interpretation
    switch (position) {
      case 'Past':
        reading += `your past experiences with ${cardMeanings[cardName] || 'these energies'} have shaped your current situation. `;
        break;
      case 'Present':
        reading += `you are currently experiencing or need to embody the qualities of ${cardMeanings[cardName] || 'this card'} in your life right now. `;
        break;
      case 'Future':
        reading += `embracing ${cardMeanings[cardName] || 'these qualities'} will help you navigate what lies ahead. `;
        break;
      default:
        reading += `this energy is significant in relation to your question. `;
    }
    
    reading += `\n\n`;
  });
  
  // Add overall interpretation
  reading += `Looking at these cards together, I see a narrative forming. `;
  
  if (cards.length === 1) {
    reading += `This single card provides clear guidance for your question. `;
  } else if (cards.length === 3) {
    reading += `The progression from past to present to future shows an evolution in your journey. `;
  } else if (cards.length > 3) {
    reading += `The complex interplay between these cards reveals multiple aspects of your situation. `;
  }
  
  reading += `\n\nMy guidance for you is to reflect on these messages and consider how they apply to your specific circumstances. `;
  reading += `Remember that you have the power to shape your path forward, and these cards are simply tools for insight and reflection.\n\n`;
  
  reading += `I hope this reading provides clarity and inspiration for your journey ahead.\n\n`;
  
  reading += `Warmly,\nPsychic Tarot Andrew`;
  
  return reading;
};
