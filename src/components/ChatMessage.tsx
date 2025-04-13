
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: string;
    content: string;
  };
}

// Fonction pour convertir les marqueurs markdown simples en HTML
const formatMessageContent = (content: string) => {
  // Convertir les textes entre ** en gras
  let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convertir les textes entre * en italique
  formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convertir les sauts de ligne
  formattedContent = formattedContent.replace(/\n/g, '<br/>');
  
  return formattedContent;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center mr-2 mt-1">
          <span className="text-brand-blue text-xs font-semibold">ADI</span>
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] p-3 rounded-xl",
          isUser 
            ? "bg-brand-blue text-white rounded-tr-none" 
            : "bg-white border border-gray-200 shadow-sm rounded-tl-none"
        )}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap break-words font-montserrat font-light">
            {message.content}
          </p>
        ) : (
          <p 
            className="text-sm whitespace-pre-wrap break-words font-montserrat"
            dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
          />
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 flex items-center justify-center ml-1 mt-1">
          <Check size={16} className="text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
