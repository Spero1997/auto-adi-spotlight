import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Bonjour ! Je suis l\'assistant virtuel d\'Auto Adi. Comment puis-je vous aider aujourd\'hui ?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

const qualificationQuestions = [
  "Quel type de véhicule recherchez-vous ?",
  "Quel est votre budget maximum ?", 
  "Préférez-vous un véhicule essence, diesel, hybride ou électrique ?",
  "Quand souhaitez-vous acheter un véhicule ?",
  "Souhaitez-vous être recontacté par notre équipe ?",
];

// Base de connaissances pour les réponses générales
const knowledgeBase = [
  {
    keywords: ['prix', 'tarif', 'coût', 'budget'],
    response: "Nos véhicules sont disponibles dans différentes gammes de prix, de l'entrée de gamme au premium. Avez-vous un budget spécifique en tête ?"
  },
  {
    keywords: ['garantie', 'garanti'],
    response: "Tous nos véhicules d'occasion sont garantis minimum 3 mois. Nous proposons également des extensions de garantie jusqu'à 60 mois."
  },
  {
    keywords: ['essai', 'tester', 'essayer'],
    response: "Vous pouvez essayer n'importe quel véhicule de notre parc. Il suffit de prendre rendez-vous par téléphone ou directement à notre concession."
  },
  {
    keywords: ['financement', 'crédit', 'paiement', 'mensualité'],
    response: "Nous proposons plusieurs solutions de financement adaptées à votre situation : crédit classique, LOA ou LLD. Souhaitez-vous plus d'informations sur ces options ?"
  },
  {
    keywords: ['horaire', 'ouverture', 'fermeture', 'ouvert'],
    response: "Notre concession est ouverte du lundi au vendredi de 9h à 19h et le samedi de 9h à 18h. Nous sommes fermés le dimanche."
  },
  {
    keywords: ['adresse', 'localisation', 'où', 'situé'],
    response: "Notre concession principale est située au 15 avenue de la Liberté, 75008 Paris. Vous pouvez nous trouver facilement grâce à Google Maps ou Waze."
  },
  {
    keywords: ['reprise', 'racheter', 'rachat', 'échange'],
    response: "Nous proposons un service de reprise de votre ancien véhicule. Nous pouvons évaluer votre véhicule rapidement et vous faire une offre de reprise."
  },
  {
    keywords: ['délai', 'livraison', 'attente', 'quand'],
    response: "Pour les véhicules en stock, la livraison peut se faire sous 48h après finalisation du dossier. Pour les commandes spéciales, le délai peut varier de 1 à 3 mois selon le modèle."
  }
];

const Chatbot = () => {
  const { translate, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userInfo, setUserInfo] = useState({
    vehicleType: '',
    budget: '',
    fuelType: '',
    timeframe: '',
    contact: '',
    email: '',
    phone: '',
  });
  const [isQualifying, setIsQualifying] = useState(false);
  const [isCollectingContact, setIsCollectingContact] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const findKnowledgeBaseResponse = (userInput: string): string | null => {
    const lowercaseInput = userInput.toLowerCase();
    
    for (const item of knowledgeBase) {
      if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return item.response;
      }
    }
    
    return null;
  };

  const processUserResponse = (userInput: string) => {
    if (isCollectingContact) {
      if (!userInfo.email) {
        setUserInfo({...userInfo, email: userInput});
        addMessage("Merci ! Pouvez-vous également me donner votre numéro de téléphone ?", "bot");
        return;
      } else if (!userInfo.phone) {
        setUserInfo({...userInfo, phone: userInput});
        addMessage("Parfait ! Notre équipe vous contactera très bientôt. En attendant, je reste à votre disposition pour toute autre question.", "bot");
        setIsCollectingContact(false);
        
        console.log("Lead qualifié:", userInfo);
        toast.success("Vos informations ont été enregistrées avec succès !");
        return;
      }
    }

    if (isQualifying) {
      switch (questionIndex) {
        case 0:
          setUserInfo({...userInfo, vehicleType: userInput});
          break;
        case 1:
          setUserInfo({...userInfo, budget: userInput});
          break;
        case 2:
          setUserInfo({...userInfo, fuelType: userInput});
          break;
        case 3:
          setUserInfo({...userInfo, timeframe: userInput});
          break;
        case 4:
          setUserInfo({...userInfo, contact: userInput});
          
          if (userInput.toLowerCase().includes('oui')) {
            setIsCollectingContact(true);
            addMessage("Excellent ! Pour que notre équipe puisse vous contacter, pourriez-vous me donner votre adresse email ?", "bot");
            setIsQualifying(false);
            return;
          } else {
            addMessage("Je vous remercie pour ces informations ! N'hésitez pas à parcourir notre catalogue de véhicules ou à me poser d'autres questions.", "bot");
            setIsQualifying(false);
            return;
          }
      }

      if (questionIndex < qualificationQuestions.length - 1) {
        setQuestionIndex(prevIndex => prevIndex + 1);
        addMessage(qualificationQuestions[questionIndex + 1], "bot");
      }
      return;
    }

    const knowledgeResponse = findKnowledgeBaseResponse(userInput);
    
    if (knowledgeResponse) {
      addMessage(knowledgeResponse, "bot");
      return;
    }
    
    if (userInput.toLowerCase().includes('acheter') || 
        userInput.toLowerCase().includes('cherche') || 
        userInput.toLowerCase().includes('voiture') || 
        userInput.toLowerCase().includes('véhicule')) {
      addMessage("Je vois que vous êtes intéressé par l'achat d'un véhicule. Je peux vous aider à trouver celui qui vous convient le mieux.", "bot");
      setTimeout(() => {
        startQualification();
      }, 1000);
    } else if (userInput.toLowerCase().includes('merci')) {
      addMessage("Je vous en prie ! Y a-t-il autre chose que je puisse faire pour vous ?", "bot");
    } else if (userInput.toLowerCase().includes('bonjour') || userInput.toLowerCase().includes('salut') || userInput.toLowerCase().includes('hello')) {
      addMessage("Bonjour ! Comment puis-je vous aider aujourd'hui ?", "bot");
    } else {
      addMessage("Je ne suis pas sûr de comprendre votre demande. Puis-je vous aider sur des sujets comme nos véhicules disponibles, nos tarifs, les options de financement ou prendre un rendez-vous ?", "bot");
    }
  };

  const startQualification = () => {
    setIsQualifying(true);
    setQuestionIndex(0);
    addMessage("Pour mieux vous aider, j'aimerais vous poser quelques questions. " + qualificationQuestions[0], "bot");
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    processUserResponse(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const translations = {
    chatWithUs: {
      FR: "Discuter avec nous",
      EN: "Chat with us",
      ES: "Hablar con nosotros",
      IT: "Chatta con noi",
      PT: "Converse conosco",
      RO: "Discută cu noi"
    },
    typeMessage: {
      FR: "Tapez votre message...",
      EN: "Type your message...",
      ES: "Escriba su mensaje...",
      IT: "Scrivi il tuo messaggio...",
      PT: "Digite sua mensagem...",
      RO: "Scrieți mesajul dvs..."
    },
    send: {
      FR: "Envoyer",
      EN: "Send",
      ES: "Enviar",
      IT: "Invia",
      PT: "Enviar",
      RO: "Trimite"
    }
  };

  return (
    <div className="fixed right-6 z-50" style={{ top: 'calc(50% - 24px)' }}>
      <button
        onClick={toggleChat}
        className={`bg-brand-blue hover:bg-brand-darkBlue text-white rounded-full p-4 shadow-lg transition-all chatbot-button-pulse ${
          isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        aria-label={translate('chatWithUs', translations.chatWithUs)}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <div
        className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all transform ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        } w-80 md:w-96 max-h-[500px] flex flex-col`}
        style={{ visibility: isOpen ? 'visible' : 'hidden', position: 'absolute', top: 'calc(-250px)', right: '0' }}
      >
        <div className="bg-brand-blue text-white p-4 flex justify-between items-center">
          <h3 className="font-semibold">Auto Adi - {translate('chatWithUs', translations.chatWithUs)}</h3>
          <button onClick={toggleChat} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto max-h-[350px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-brand-blue text-white'
                    : 'bg-gray-100 text-gray-800'
                } max-w-[80%]`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'bot' && (
                    <Bot className="h-5 w-5 mt-1 text-brand-blue" />
                  )}
                  <span>{message.text}</span>
                  {message.sender === 'user' && (
                    <User className="h-5 w-5 mt-1 text-white" />
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-3 flex items-center">
          <input
            type="text"
            placeholder={translate('typeMessage', translations.typeMessage)}
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <Button
            onClick={handleSendMessage}
            className="rounded-l-none"
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">{translate('send', translations.send)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
