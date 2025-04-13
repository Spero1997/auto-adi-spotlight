
import { useState, useEffect } from 'react';

// Réponses prédéfinies pour simuler une conversation avec un chatbot
const predefinedResponses = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'hi', 'hey'],
    response: "Bonjour, je suis votre assistant personnel dédié. Comment puis-je vous aider aujourd'hui avec l'acquisition de votre véhicule de prestige ?"
  },
  {
    keywords: ['acheter', 'achat', 'achete', 'prix', 'tarif', 'coût', 'cout', 'purchase', 'buy'],
    response: "Je serais ravi de vous accompagner dans l'acquisition de votre véhicule. Pourriez-vous me préciser quel modèle vous intéresse particulièrement ? Nous avons une sélection exclusive de véhicules de prestige disponibles immédiatement."
  },
  {
    keywords: ['mercedes', 'benz'],
    response: "Mercedes-Benz incarne l'excellence et le raffinement allemand. Nous disposons de plusieurs modèles d'exception, notamment la Classe S, l'AMG GT et le GLS. Quel type de Mercedes vous intéresse ? Berline, SUV ou coupé sport ?"
  },
  {
    keywords: ['bmw'],
    response: "BMW offre une expérience de conduite unique, alliant performance et élégance. Notre collection comprend les Série 7, X7 et M8. Recherchez-vous une berline luxueuse, un SUV spacieux ou un coupé sportif ?"
  },
  {
    keywords: ['audi'],
    response: "Audi représente la précision technique et le design avant-gardiste. Nous proposons les A8, Q8 et RS e-tron GT. Préférez-vous une berline sophistiquée, un SUV polyvalent ou une sportive électrique ?"
  },
  {
    keywords: ['porsche'],
    response: "Porsche incarne la passion automobile et l'excellence sportive. Notre sélection comprend les 911, Cayenne et Taycan. Êtes-vous attiré par un coupé iconique, un SUV performant ou une sportive électrique ?"
  },
  {
    keywords: ['financement', 'finance', 'paiement', 'payment', 'credit', 'crédit', 'leasing'],
    response: "Nous proposons des solutions de financement sur mesure pour notre clientèle exigeante. Location avec option d'achat, crédit bail ou financement classique, notre conseiller financier peut élaborer une proposition adaptée à votre situation. Souhaitez-vous que j'organise un rendez-vous personnalisé ?"
  },
  {
    keywords: ['livraison', 'délai', 'delivery', 'délais', 'disponible', 'disponibilité'],
    response: "Nous accordons une attention particulière à la livraison de votre véhicule. Pour les modèles en stock, nous pouvons organiser une livraison sous 48h. Pour les configurations spécifiques, le délai varie entre 3 et 12 semaines selon le modèle. Souhaitez-vous connaître la disponibilité d'un modèle précis ?"
  },
  {
    keywords: ['garantie', 'warranty', 'assurance', 'insurance'],
    response: "Tous nos véhicules bénéficient d'une garantie premium de 24 mois minimum. Nous proposons également des extensions de garantie jusqu'à 5 ans et des formules d'assurance tous risques avec des conditions privilégiées. Souhaitez-vous des détails sur nos programmes de garantie ?"
  },
  {
    keywords: ['rendez-vous', 'rdv', 'appointment', 'visite', 'visit', 'showroom', 'essai', 'test', 'essayer'],
    response: "Je serais ravi d'organiser un rendez-vous personnalisé dans notre showroom ou un essai du véhicule qui vous intéresse. Notre concession est ouverte du lundi au samedi de 9h à 19h, et nous pouvons également prévoir un accueil sur mesure en dehors de ces horaires. Quelle date vous conviendrait ?"
  },
  {
    keywords: ['contact', 'appeler', 'téléphone', 'call', 'phone'],
    response: "Je peux vous mettre en relation avec l'un de nos conseillers d'excellence. Souhaitez-vous être contacté par téléphone ou préférez-vous un échange par email ? Nous nous engageons à vous répondre dans un délai maximum de 2 heures pendant nos horaires d'ouverture."
  },
  {
    keywords: ['merci', 'thanks', 'thank', 'remercie'],
    response: "C'est avec plaisir que je vous accompagne dans votre projet. N'hésitez pas si vous avez d'autres questions. La satisfaction de notre clientèle est notre priorité absolue."
  }
];

// Fallback pour les questions sans correspondance
const fallbackResponses = [
  "Je vous remercie pour votre demande. Afin de vous apporter une réponse précise, puis-je vous proposer d'être mis en relation avec l'un de nos conseillers spécialisés ?",
  "Votre question mérite une attention particulière. Permettez-moi de collecter davantage d'informations sur vos attentes pour vous proposer la solution idéale.",
  "Je comprends l'importance de votre demande. Pour vous garantir un service d'excellence, je peux organiser un rendez-vous avec notre expert dédié à ce sujet. Cela vous conviendrait-il ?",
  "Votre satisfaction est notre priorité. Pour répondre avec précision à votre demande, j'aurais besoin de quelques informations supplémentaires. Puis-je vous demander plus de détails ?"
];

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Chercher une correspondance dans les réponses prédéfinies
    for (const item of predefinedResponses) {
      if (item.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        return item.response;
      }
    }
    
    // Si aucune correspondance, utiliser une réponse par défaut aléatoire
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
  };

  const sendMessage = (content: string) => {
    // Ajouter le message de l'utilisateur
    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simuler la réponse du chatbot
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = { role: 'assistant', content: getResponse(content) };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Délai aléatoire entre 1-2 secondes pour simuler la frappe
  };

  return {
    messages,
    sendMessage,
    input,
    setInput,
    isTyping
  };
};
