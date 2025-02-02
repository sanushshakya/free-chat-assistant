import React, { useState, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { useWebSocket } from './hooks/useWebSocket';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  // Use the WebContainer URL format
  const wsUrl = `ws://${window.location.hostname}:3000`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl);

  useEffect(() => {
    if (lastMessage) {
      const botResponse: Message = {
        id: messages.length + 1,
        text: lastMessage,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }
  }, [lastMessage]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    sendMessage(text);
  };

  const connectionStatus = () => {
    switch (readyState) {
      case WebSocket.CONNECTING:
        return <div className="flex items-center gap-2 text-yellow-600"><AlertCircle className="w-4 h-4" /> Connecting...</div>;
      case WebSocket.CLOSED:
        return <div className="flex items-center gap-2 text-red-600"><AlertCircle className="w-4 h-4" /> Disconnected</div>;
      case WebSocket.OPEN:
        return <div className="text-green-600">Connected</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-t-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">AI Chat Assistant</h1>
                <p className="text-sm text-gray-500">Always here to help</p>
              </div>
            </div>
            <div className="text-sm">
              {connectionStatus()}
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-xl p-4 shadow-sm">
          <ChatInput onSendMessage={handleSendMessage} disabled={readyState !== WebSocket.OPEN} />
        </div>
      </div>
    </div>
  );
}

export default App;