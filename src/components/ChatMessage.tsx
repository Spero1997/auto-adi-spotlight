
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: string;
    content: string;
  };
}

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
        <p className={cn(
          "text-sm whitespace-pre-wrap break-words",
          isUser ? "font-montserrat font-light" : "font-montserrat"
        )}>
          {message.content}
        </p>
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
