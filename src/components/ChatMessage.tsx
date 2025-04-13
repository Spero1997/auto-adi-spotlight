
import React from 'react';
import { cn } from '@/lib/utils';

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
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] p-3 rounded-xl",
          isUser 
            ? "bg-brand-blue text-white rounded-tr-none" 
            : "bg-white border border-gray-200 shadow-sm rounded-tl-none"
        )}
      >
        <p className={cn(
          "text-sm",
          isUser ? "font-montserrat font-light" : "font-montserrat"
        )}>
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
