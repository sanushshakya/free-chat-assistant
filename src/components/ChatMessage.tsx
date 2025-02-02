import React from "react";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isBot,
  timestamp,
}) => {
  return (
    <div
      className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"} mb-4`}
    >
      {isBot && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      )}
      <div className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
        <div
          className={`px-4 py-2 rounded-2xl max-w-[80%] ${
            isBot
              ? "bg-white text-gray-800 rounded-tl-none"
              : "bg-blue-600 text-white rounded-tr-none"
          }`}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
      </div>
      {!isBot && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};
