
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ChatRole } from './types';
import ChatInput from './components/ChatInput';
import ChatMessageComponent from './components/ChatMessage';
import { getInvestmentAnalysis } from './services/geminiService';
import RoleIcon from './components/RoleIcon';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      role: ChatRole.SYSTEM,
      content: 'Welcome to the AI Investment Chat Room! I am a panel of four analysts: Technical, Fundamental, Quantitative, and Macro. How can I help you today?',
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: ChatRole.USER,
      content: input,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botResponse = await getInvestmentAnalysis(input);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: ChatRole.BOT,
        content: botResponse,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: ChatRole.SYSTEM,
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePresetPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="bg-gray-800 shadow-md p-4 flex items-center space-x-4 border-b border-gray-700">
        <div className="p-2 bg-indigo-600 rounded-full">
            <RoleIcon role="bot" className="h-6 w-6 text-white"/>
        </div>
        <div>
            <h1 className="text-xl font-bold text-white">AI Investment Chat Room</h1>
            <p className="text-sm text-gray-400">Your personal panel of AI financial analysts</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} />
        ))}
        {isLoading && <ChatMessageComponent message={{ id: 'loading', role: ChatRole.BOT, content: '' }} isLoading={true} />}
        <div ref={messagesEndRef} />
      </main>

       {messages.length <= 1 && !isLoading && (
        <div className="px-4 md:px-6 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => handlePresetPrompt('Analyze NVIDIA (NVDA)')}
            className="bg-gray-800 hover:bg-gray-700 text-left p-4 rounded-lg transition-colors"
          >
            <p className="font-semibold text-white">Analyze a stock</p>
            <p className="text-sm text-gray-400">e.g., NVIDIA (NVDA)</p>
          </button>
          <button
            onClick={() => handlePresetPrompt('Please scan now for stocks worth investing in')}
            className="bg-gray-800 hover:bg-gray-700 text-left p-4 rounded-lg transition-colors"
          >
            <p className="font-semibold text-white">Scan the market</p>
            <p className="text-sm text-gray-400">Find current opportunities</p>
          </button>
        </div>
      )}

      <footer className="sticky bottom-0 bg-gray-900 p-4 md:p-6 border-t border-gray-700">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;
