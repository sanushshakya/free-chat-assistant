import { useEffect, useRef, useState } from 'react';

interface WebSocketHook {
  sendMessage: (message: string) => void;
  lastMessage: string | null;
  readyState: number;
}

export const useWebSocket = (url: string): WebSocketHook => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket');
      setReadyState(WebSocket.OPEN);
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket');
      setReadyState(WebSocket.CLOSED);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onmessage = (event) => {
      setLastMessage(event.data);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  return { sendMessage, lastMessage, readyState };
};