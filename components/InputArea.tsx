import React, { useState, KeyboardEvent } from 'react';
import { SendHorizontal } from 'lucide-react';

interface InputAreaProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white p-4 border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
      <div className="max-w-3xl mx-auto relative flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer or ask a question..."
          disabled={disabled}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-slate-800 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner font-medium text-sm"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="p-3.5 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/30"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="max-w-3xl mx-auto mt-3 text-center">
        <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
          AI Tutor • Powered by Gemini
        </p>
      </div>
    </div>
  );
};

export default InputArea;