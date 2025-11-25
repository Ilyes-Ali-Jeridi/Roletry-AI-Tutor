import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import GA4Simulator from './components/GA4Simulator';
import { Message, NextAction } from './types';
import { initializeLessonChat, sendMessageToLesson, sendMessageToQA, initializeQAChat } from './services/geminiService';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  // State for App Mode: added 'simulation'
  const [mode, setMode] = useState<'lesson' | 'qa' | 'simulation'>('lesson');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasInitializedLesson, setHasInitializedLesson] = useState(false);
  
  // Separate Message States
  const [lessonMessages, setLessonMessages] = useState<Message[]>([]);
  const [qaMessages, setQaMessages] = useState<Message[]>([]);
  
  // Separate Loading States
  const [lessonLoading, setLessonLoading] = useState(false);
  const [qaLoading, setQaLoading] = useState(false);

  // Derived State
  const messages = mode === 'qa' ? qaMessages : lessonMessages;
  const isLoading = mode === 'qa' ? qaLoading : lessonLoading;

  // Initialize Lesson Chat on Mount
  useEffect(() => {
    const init = async () => {
      if (hasInitializedLesson) return;
      
      setLessonLoading(true);
      try {
        const initialGreeting = await initializeLessonChat();
        const greetingMsg: Message = {
          id: crypto.randomUUID(),
          role: 'model',
          text: initialGreeting, // This should be JSON now
          timestamp: Date.now()
        };
        setLessonMessages([greetingMsg]);
        setHasInitializedLesson(true);
      } catch (error) {
        console.error("Initialization error:", error);
        setLessonMessages([{
          id: 'error',
          role: 'model',
          text: "⚠️ Connection failed. Please check your API settings.",
          timestamp: Date.now()
        }]);
      } finally {
        setLessonLoading(false);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Mode Switching
  const handleModeChange = (newMode: 'lesson' | 'qa' | 'simulation') => {
    setMode(newMode);
    setSidebarOpen(false); // Close sidebar on mobile select
    
    // Lazy Init QA Chat if empty
    if (newMode === 'qa' && qaMessages.length === 0) {
       initializeQAChat();
       setQaMessages([{
         id: 'qa-welcome',
         role: 'model',
         text: "Hi! I'm your GA4 Expert Assistant. \n\nI can help you with specific questions, troubleshooting, or explaining concepts in detail. \n\n**What would you like to know?**",
         timestamp: Date.now()
       }]);
    }
  };

  const handleSendMessage = useCallback(async (text: string) => {
    // If in simulation, do nothing or switch back to chat? 
    // For now, we only allow sending messages in lesson or qa mode.
    if (mode === 'simulation') return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      text,
      timestamp: Date.now()
    };

    if (mode === 'lesson') {
      setLessonMessages(prev => [...prev, userMsg]);
      setLessonLoading(true);

      try {
        let accumulatedText = '';
        const stream = sendMessageToLesson(text);
        for await (const chunk of stream) {
          accumulatedText += chunk;
        }
        
        const botMsg: Message = {
          id: crypto.randomUUID(),
          role: 'model',
          text: accumulatedText,
          timestamp: Date.now()
        };
        setLessonMessages(prev => [...prev, botMsg]);
      } catch (error) {
        setLessonMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: 'model',
          text: "Sorry, I encountered an error. Please try again.",
          timestamp: Date.now()
        }]);
      } finally {
        setLessonLoading(false);
      }
    } else if (mode === 'qa') {
      // QA MODE
      setQaMessages(prev => [...prev, userMsg]);
      setQaLoading(true);
      
      try {
        let accumulatedText = '';
        const stream = sendMessageToQA(text);
        
        for await (const chunk of stream) {
          accumulatedText += chunk;
        }

        const botMsg: Message = {
          id: crypto.randomUUID(),
          role: 'model',
          text: accumulatedText,
          timestamp: Date.now()
        };
        setQaMessages(prev => [...prev, botMsg]);
      } catch (error) {
         setQaMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: 'model',
          text: "Sorry, I couldn't process your question. Please try again.",
          timestamp: Date.now()
        }]);
      } finally {
        setQaLoading(false);
      }
    }

  }, [mode]);

  // Handler for structured actions (buttons)
  const handleAction = (action: NextAction) => {
    if (action.action_type === 'switch_mode') {
      setMode('simulation');
    } else {
      // If there's a payload with specific data (like role selection), append it or handle it?
      // Currently the system instruction expects the user to "say" the choice.
      // We can send the choice text.
      const textToSend = action.payload?.choice || action.payload?.target_role || action.label;
      handleSendMessage(textToSend);
    }
  };

  const handleModuleSelect = (moduleId: number | string) => {
    handleModeChange('lesson');
    setSidebarOpen(false);
    // Send a system-like command to the AI to switch modules
    if (moduleId === 'interview_prep') {
      handleSendMessage(`Start Interview Prep`);
    } else {
      handleSendMessage(`Start Module ${moduleId}`);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-300 ease-in-out z-30 md:z-auto shadow-2xl md:shadow-none`}>
         <Sidebar 
            currentMode={mode} 
            onModeChange={handleModeChange} 
            onModuleSelect={handleModuleSelect}
         />
         <button 
           onClick={() => setSidebarOpen(false)}
           className="absolute top-4 right-4 md:hidden text-slate-400 hover:text-white"
         >
           <X className="w-6 h-6" />
         </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
             <div className="bg-gradient-to-br from-orange-500 to-red-500 p-1.5 rounded-lg shadow-sm">
                <span className="text-white font-bold text-xs">GA4</span>
             </div>
             <span className="font-bold text-slate-800">Micro-Tutor</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="text-slate-600 active:scale-95 transition-transform">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* CONTENT SWITCHER */}
        {mode === 'simulation' ? (
          <GA4Simulator />
        ) : (
          <>
            <ChatArea 
              messages={messages} 
              isLoading={isLoading} 
              onAction={handleAction}
            />
            <InputArea onSend={handleSendMessage} disabled={isLoading} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;