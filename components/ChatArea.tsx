import React, { useRef, useEffect } from 'react';
import { Message, NextAction } from '../types';
import MessageBubble from './MessageBubble';
import { Loader2 } from 'lucide-react';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onAction: (action: NextAction) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading, onAction }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 mt-20">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
            <p className="font-medium text-slate-600">Initializing Tutor...</p>
            <p className="text-sm mt-2">Getting your lesson plan ready.</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            onAction={onAction}
          />
        ))}

        {isLoading && messages.length > 0 && (
          <div className="flex justify-start mb-6 ml-14">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatArea;