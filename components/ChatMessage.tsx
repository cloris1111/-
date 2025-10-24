
import React from 'react';
import { ChatMessage, ChatRole } from '../types';
import RoleIcon from './RoleIcon';
import LoadingSpinner from './LoadingSpinner';

interface ChatMessageProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === ChatRole.USER;
  const isSystem = message.role === ChatRole.SYSTEM;

  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const bubbleClasses = isUser
    ? 'bg-indigo-600 text-white rounded-br-none'
    : 'bg-gray-800 text-gray-300 rounded-bl-none';
  const systemClasses = 'text-center text-sm text-gray-500 italic';

  if (isSystem) {
    return (
      <div className={systemClasses}>
        {message.content}
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-3 ${containerClasses}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <RoleIcon role="bot" className="h-8 w-8 text-gray-400" />
        </div>
      )}
      <div className={`max-w-xl lg:max-w-3xl px-5 py-4 rounded-2xl ${bubbleClasses}`}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <LoadingSpinner />
            <span className="text-gray-400">The analysts are discussing...</span>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none text-gray-200 prose-headings:text-white prose-strong:text-white">
            <pre className="whitespace-pre-wrap font-sans text-sm md:text-base">{message.content}</pre>
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0">
          <RoleIcon role="user" className="h-8 w-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;
