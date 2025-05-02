import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import { ChatMessage } from "../type/admin/chat";

export const useChatSocket = (
  roomId: string,
  onMessage: (msg: ChatMessage) => void
) => {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<CompatClient | null>(null);
  const receivedIdsRef = useRef<Set<string>>(new Set());

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!roomId) return;

    const client: CompatClient = Stomp.over(() => new SockJS(`${API_BASE_URL}/ws-chat`));
    client.reconnectDelay = 5000;

    client.connect({}, () => {
      setConnected(true);

      client.subscribe(`/topic/chat/${roomId}`, (message: IMessage) => {
        try {
          const data = JSON.parse(message.body) as ChatMessage;
          if (!data.id || receivedIdsRef.current.has(data.id)) return;

          receivedIdsRef.current.add(data.id);
          onMessage({ ...data, status: "sent" });
        } catch (e) {
          console.error("❌ Parse error:", e);
        }
      });
    });

    clientRef.current = client;

    return () => {
      if (clientRef.current?.connected) clientRef.current.disconnect();
      setConnected(false);
    };
  }, [roomId]);

  const sendMessage = (msg: ChatMessage) => {
    clientRef.current?.send("/app/chat.send", {}, JSON.stringify(msg));
  };

  return { sendMessage, connected };
};