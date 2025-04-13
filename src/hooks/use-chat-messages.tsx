
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// URL de l'API OpenAI (ou autre service IA)
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Interface pour les messages
interface ChatMessage {
  role: string;
  content: string;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Message d'accueil initial que le bot affichera
  const welcomeMessage: ChatMessage = {
    role: 'assistant',
    content: "Bonjour, je suis votre assistant personnel Auto ADI. Comment puis-je vous aider aujourd'hui ? Je peux vous guider dans l'achat de votre véhicule de luxe ou répondre à vos questions."
  };

  // Réponses de secours en cas d'erreur API
  const fallbackResponses = [
    "Je vous remercie pour votre demande. Afin de vous apporter une réponse précise, puis-je vous proposer d'être mis en relation avec l'un de nos conseillers spécialisés ?",
    "Votre question mérite une attention particulière. Permettez-moi de collecter davantage d'informations sur vos attentes pour vous proposer la solution idéale.",
    "Je comprends l'importance de votre demande. Pour vous garantir un service d'excellence, je peux organiser un rendez-vous avec notre expert dédié à ce sujet. Cela vous conviendrait-il ?",
    "Votre satisfaction est notre priorité. Pour répondre avec précision à votre demande, j'aurais besoin de quelques informations supplémentaires. Puis-je vous demander plus de détails ?"
  ];

  // Fonction pour obtenir une réponse de l'IA
  const getAIResponse = async (userMessages: ChatMessage[]): Promise<string> => {
    try {
      // Préparation du contexte pour l'IA
      const systemPrompt = {
        role: "system", 
        content: `Vous êtes l'assistant virtuel d'Auto ADI, une concession automobile de luxe. 
        Votre mission est d'offrir un service client exceptionnel, de répondre aux questions sur les véhicules 
        de luxe (Mercedes, BMW, Audi, Porsche, etc.), les options de financement, les garanties, et d'aider 
        les clients dans leur parcours d'achat. Soyez courtois, précis et professionnel. 
        Limitez vos réponses à 3-4 phrases maximum pour maintenir l'engagement.`
      };
      
      // Pour test sans API key, simulons une réponse IA
      // Dans un environnement réel, vous utiliseriez fetch() pour appeler l'API
      console.log("Sending prompt to AI:", [...userMessages]);
      
      // Simulation d'appel API - À remplacer par une vraie API
      return new Promise((resolve) => {
        const userQuery = userMessages[userMessages.length - 1].content.toLowerCase();
        
        // Logique de réponse contextuelle basée sur le contenu
        setTimeout(() => {
          if (userQuery.includes('bonjour') || userQuery.includes('salut') || userQuery.includes('hello')) {
            resolve("Bonjour ! Je suis l'assistant virtuel d'Auto ADI. Comment puis-je vous aider aujourd'hui dans votre recherche de véhicule de luxe ?");
          } 
          else if (userQuery.includes('mercedes')) {
            resolve("Mercedes-Benz représente l'excellence allemande en matière de luxe automobile. Notre gamme comprend les Classe S, Classe E, GLE et AMG GT, offrant un parfait équilibre entre confort, performance et innovation. Souhaitez-vous des informations sur un modèle en particulier ?");
          }
          else if (userQuery.includes('bmw')) {
            resolve("BMW incarne le plaisir de conduire avec sa signature 'The Ultimate Driving Machine'. Notre sélection inclut les Série 7, X7, et M8 qui combinent sportivité et raffinement. Recherchez-vous une berline, un SUV ou un coupé performant ?");
          }
          else if (userQuery.includes('porsche')) {
            resolve("Porsche représente l'excellence en matière de voitures de sport. Notre collection comprend les légendaires 911, Taycan électrique et Cayenne. Chaque Porsche offre des performances exceptionnelles et un design intemporel. Quel modèle vous intéresse particulièrement ?");
          }
          else if (userQuery.includes('audi')) {
            resolve("Audi se distingue par son design avant-gardiste et sa technologie de pointe. Notre gamme comprend les A8, e-tron GT et Q8, alliant élégance, confort et performance. Puis-je vous renseigner sur un modèle spécifique ou sur nos offres actuelles ?");
          }
          else if (userQuery.includes('prix') || userQuery.includes('coût') || userQuery.includes('tarif')) {
            resolve("Nos véhicules de luxe sont disponibles à partir de 65 000€, avec des options de financement personnalisées. Le prix exact dépend du modèle, de la motorisation et des équipements choisis. Puis-je vous proposer une estimation pour un modèle particulier ?");
          }
          else if (userQuery.includes('essai') || userQuery.includes('test')) {
            resolve("Nous serions ravis de vous proposer un essai routier personnalisé. Nos experts vous accompagneront pour découvrir toutes les fonctionnalités du véhicule qui vous intéresse. Quand souhaiteriez-vous planifier cet essai et quel modèle vous attire ?");
          }
          else if (userQuery.includes('financement') || userQuery.includes('crédit') || userQuery.includes('leasing')) {
            resolve("Auto ADI propose plusieurs solutions de financement premium : crédit classique, LOA (Location avec Option d'Achat) et LLD (Location Longue Durée). Nous adaptons nos offres à votre situation personnelle pour une expérience sans contrainte. Quelle formule vous intéresse ?");
          }
          else if (userQuery.includes('garantie')) {
            resolve("Tous nos véhicules bénéficient d'une garantie constructeur, avec possibilité d'extension jusqu'à 5 ans. Nous proposons également des contrats de maintenance premium pour préserver la valeur et les performances de votre voiture. Souhaitez-vous plus de détails ?");
          }
          else if (userQuery.includes('merci')) {
            resolve("Je vous en prie, c'est avec plaisir que je vous accompagne dans votre projet automobile. N'hésitez pas si vous avez d'autres questions. La satisfaction de nos clients est notre priorité absolue chez Auto ADI.");
          }
          else {
            // Réponse générique pour les autres requêtes
            resolve("Votre demande est importante pour nous. Chez Auto ADI, nous proposons une sélection exclusive de véhicules de prestige et un service personnalisé. Pour mieux répondre à vos attentes, pourriez-vous préciser votre recherche ou votre intérêt particulier ?");
          }
        }, 800); // Simulation de délai réseau
      });
    } catch (error) {
      console.error("Erreur lors de la communication avec l'API:", error);
      toast({
        title: "Erreur de communication",
        description: "Impossible de contacter notre service intelligent pour le moment.",
        variant: "destructive",
      });
      
      // En cas d'erreur, utiliser une réponse de secours
      const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
      return fallbackResponses[randomIndex];
    }
  };

  const sendMessage = (content: string) => {
    // Ajouter le message de l'utilisateur
    const userMessage: ChatMessage = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    
    // Simuler la réponse du chatbot
    setIsTyping(true);
    
    // Obtenir une réponse de l'IA
    getAIResponse(updatedMessages)
      .then(response => {
        const botResponse: ChatMessage = { role: 'assistant', content: response };
        setMessages(prev => [...prev, botResponse]);
      })
      .catch(error => {
        console.error("Erreur lors de la génération de réponse:", error);
        // Fallback en cas d'erreur
        const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
        const fallbackResponse: ChatMessage = { 
          role: 'assistant', 
          content: fallbackResponses[randomIndex] 
        };
        setMessages(prev => [...prev, fallbackResponse]);
      })
      .finally(() => {
        setIsTyping(false);
      });
  };

  return {
    messages,
    sendMessage,
    input,
    setInput,
    isTyping
  };
};
