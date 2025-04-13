
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Maximize, Minimize, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatMessages } from '@/hooks/use-chat-messages';
import ChatMessage from '@/components/ChatMessage';
import { Input } from '@/components/ui/input';

const translations = {
  chatTitle: {
    FR: "Assistant Personnel",
    EN: "Personal Assistant",
    ES: "Asistente Personal",
    IT: "Assistente Personale",
    PT: "Assistente Pessoal",
    RO: "Asistent Personal"
  },
  placeholder: {
    FR: "Comment puis-je vous aider aujourd'hui ?",
    EN: "How may I assist you today?",
    ES: "¿Cómo puedo ayudarle hoy?",
    IT: "Come posso aiutarla oggi?",
    PT: "Como posso ajudá-lo hoje?",
    RO: "Cum vă pot ajuta astăzi?"
  },
  welcomeMessage: {
    FR: "Bonjour, je suis votre assistant personnel Auto ADI. Comment puis-je vous aider aujourd'hui ? Je peux vous guider dans l'achat de votre véhicule de luxe ou répondre à vos questions.",
    EN: "Hello, I am your Auto ADI personal assistant. How may I help you today? I can guide you through purchasing your luxury vehicle or answer any questions you may have.",
    ES: "Hola, soy su asistente personal de Auto ADI. ¿Cómo puedo ayudarle hoy? Puedo guiarle en la compra de su vehículo de lujo o responder a sus preguntas.",
    IT: "Buongiorno, sono il suo assistente personale Auto ADI. Come posso aiutarla oggi? Posso guidarla nell'acquisto della sua auto di lusso o rispondere alle sue domande.",
    PT: "Olá, sou seu assistente pessoal Auto ADI. Como posso ajudá-lo hoje? Posso orientá-lo na compra do seu veículo de luxo ou responder às suas perguntas.",
    RO: "Bună ziua, sunt asistentul dvs. personal Auto ADI. Cum vă pot ajuta astăzi? Vă pot ghida în achiziționarea vehiculului dvs. de lux sau vă pot răspunde la întrebări."
  },
  send: {
    FR: "Envoyer",
    EN: "Send",
    ES: "Enviar",
    IT: "Inviare",
    PT: "Enviar",
    RO: "Trimite"
  },
  open: {
    FR: "Ouvrir l'assistant",
    EN: "Open assistant",
    ES: "Abrir asistente",
    IT: "Aprire assistente",
    PT: "Abrir assistente",
    RO: "Deschide asistentul"
  }
};

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
  onExpand: () => void;
  isExpanded: boolean;
  isMobile: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onClose, 
  onMinimize, 
  onExpand, 
  isExpanded,
  isMobile
}) => {
  const { translate } = useLanguage();
  
  return (
    <div className="flex justify-between items-center p-4 border-b border-brand-gold/20 bg-gradient-to-r from-brand-blue to-brand-darkBlue">
      <h3 className="text-white font-playfair text-lg">
        {translate('chatTitle', translations.chatTitle)}
      </h3>
      <div className="flex items-center space-x-2">
        {!isMobile && (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 text-white opacity-70 hover:opacity-100 hover:bg-transparent"
              onClick={onExpand}
            >
              {isExpanded ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 text-white opacity-70 hover:opacity-100 hover:bg-transparent"
              onClick={onMinimize}
            >
              <Minimize className="h-4 w-4" />
            </Button>
          </>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 text-white opacity-70 hover:opacity-100 hover:bg-transparent"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface ChatBodyProps {
  messages: { role: string; content: string }[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isTyping: boolean;
}

const ChatBody: React.FC<ChatBodyProps> = ({ messages, messagesEndRef, isTyping }) => {
  const { language, translate } = useLanguage();
  
  const displayedMessages = messages.length > 0 
    ? messages 
    : [{ role: 'assistant', content: translate('welcomeMessage', translations.welcomeMessage) }];
  
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-1">
        {displayedMessages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500 pl-10 mt-2">
            <div className="w-2 h-2 rounded-full bg-brand-blue/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-brand-blue/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-brand-blue/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

interface ChatInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: (e?: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  translate: any;
  language: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  input, 
  setInput, 
  handleSend, 
  handleKeyDown,
  inputRef,
  translate,
  language
}) => {
  // État local pour affichage uniquement
  const [localInput, setLocalInput] = useState(input);
  
  // Synchronisation unidirectionnelle - parent vers local
  useEffect(() => {
    setLocalInput(input);
  }, [input]);
  
  // Gestionnaire qui met à jour les deux états sans redimensionnement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalInput(newValue); // Mise à jour locale immédiate pour UI
    
    // Délai minimal pour réduire les mises à jour d'état parent
    // Ce qui évite les rerendus fréquents pendant la frappe
    requestAnimationFrame(() => {
      setInput(newValue); // Mise à jour de l'état parent
    });
  };

  return (
    <form onSubmit={handleSend} className="border-t border-brand-gold/20 p-4 bg-white">
      <div className="flex items-center space-x-2">
        <Input
          ref={inputRef}
          type="text"
          value={localInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={translate('placeholder', translations.placeholder)}
          className="flex-1 p-2 h-10 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-gold/50 font-montserrat text-sm"
          autoComplete="off"
          aria-label={translate('placeholder', translations.placeholder)}
          style={{ fontSize: '14px' }} /* Taille de police fixe */
        />
        <Button 
          type="submit" 
          className="bg-brand-blue hover:bg-brand-darkBlue text-white p-2 h-10 w-10 rounded-md flex items-center justify-center"
          disabled={!localInput.trim()}
          aria-label={translate('send', translations.send)}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">{translate('send', translations.send)}</span>
        </Button>
      </div>
    </form>
  );
};

const LuxuryChatbot: React.FC = () => {
  const isMobile = useIsMobile();
  const { language, translate } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { messages, sendMessage, input, setInput, isTyping } = useChatMessages();

  // Scroll automatique vers le bas lorsque nouveaux messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus sur l'entrée lorsque le chat est ouvert
  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Délai pour permettre aux animations de se terminer
      const timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      // Maintenir le focus après l'envoi
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // Maintenir le focus
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  };

  const ChatContainer = () => {
    if (isMobile) {
      return (
        <Drawer open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (open) {
            setTimeout(() => {
              if (inputRef.current) inputRef.current.focus();
            }, 300);
          }
        }}>
          <DrawerTrigger asChild>
            <Button
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-brand-blue hover:bg-brand-darkBlue shadow-lg z-50 p-0 flex items-center justify-center"
              onClick={() => setIsOpen(true)}
              aria-label={translate('open', translations.open)}
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh] rounded-t-xl bg-white p-0">
            <div className="flex flex-col h-full">
              <ChatHeader 
                onClose={() => setIsOpen(false)} 
                onMinimize={() => {}} 
                onExpand={() => {}} 
                isExpanded={false}
                isMobile={true}
              />
              <ChatBody 
                messages={messages} 
                messagesEndRef={messagesEndRef} 
                isTyping={isTyping} 
              />
              <ChatInput 
                input={input} 
                setInput={setInput} 
                handleSend={handleSend} 
                handleKeyDown={handleKeyDown}
                inputRef={inputRef}
                translate={translate}
                language={language}
              />
            </div>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog open={isOpen && !isMinimized} onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          setIsMinimized(false);
          setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
          }, 300);
        }
      }}>
        <DialogTrigger asChild>
          {isMinimized ? (
            <div 
              className="fixed bottom-6 right-6 h-14 px-4 rounded-full bg-brand-blue hover:bg-brand-darkBlue shadow-lg z-50 flex items-center justify-center cursor-pointer"
              onClick={() => setIsMinimized(false)}
              aria-label={translate('chatTitle', translations.chatTitle)}
            >
              <MessageSquare className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-montserrat font-light">{translate('chatTitle', translations.chatTitle)}</span>
            </div>
          ) : (
            <Button
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-brand-blue hover:bg-brand-darkBlue shadow-lg z-50 p-0 flex items-center justify-center"
              onClick={() => setIsOpen(true)}
              aria-label={translate('open', translations.open)}
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent 
          className="p-0 border border-brand-gold/30 rounded-xl overflow-hidden shadow-xl sm:max-w-[400px] w-[400px] h-[500px]"
          style={{ 
            minHeight: '500px', 
            maxHeight: '500px',
            width: '400px',
            transform: 'translateZ(0)', // Force GPU acceleration
            willChange: 'transform', // Optimise les changements
            position: 'fixed',
            bottom: isExpanded ? '20px' : 'auto',
            right: isExpanded ? '20px' : 'auto',
            // Définir des dimensions fixes pour éviter le zoom
            fontSize: '16px' // Taille de police fixe
          }}
          aria-labelledby="chat-title"
          onPointerDownCapture={(e) => {
            // Empêcher les événements de zoom sur mobile
            if (e.pointerType === 'touch' && e.target instanceof HTMLElement && 
                !e.target.closest('input') && !e.target.closest('button')) {
              e.preventDefault();
            }
          }}
        >
          <div className="flex flex-col h-full">
            <ChatHeader 
              onClose={() => setIsOpen(false)} 
              onMinimize={() => setIsMinimized(true)} 
              onExpand={toggleExpand} 
              isExpanded={isExpanded}
              isMobile={false}
            />
            <ChatBody 
              messages={messages} 
              messagesEndRef={messagesEndRef} 
              isTyping={isTyping} 
            />
            <ChatInput 
              input={input} 
              setInput={setInput} 
              handleSend={handleSend} 
              handleKeyDown={handleKeyDown}
              inputRef={inputRef}
              translate={translate}
              language={language}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return <ChatContainer />;
};

export default LuxuryChatbot;
