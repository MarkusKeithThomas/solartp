import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import { ChatMessage } from "../components/MessageList";

export const useChatSocket = (
  roomId: string,
  onMessage: (msg: ChatMessage) => void
) => {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<CompatClient | null>(null);
  const hasConnectedRef = useRef(false);
  const receivedIdsRef = useRef<Set<string>>(new Set()); // ✅ Tránh nhận trùng clientId
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!roomId || hasConnectedRef.current) return;

    const client: CompatClient = Stomp.over(() => new SockJS(`${API_BASE_URL}/ws-chat`));
    client.reconnectDelay = 5000;
    // client.debug = (str) => {
    //   if (import.meta.env.DEV) 
    //   console.log("🐞 STOMP Debug:", str);
    // };

    client.connect(
      {},
      () => {
        setConnected(true);
        hasConnectedRef.current = true;

        client.subscribe(`/topic/chat/${roomId}`, (message: IMessage) => {
          try {
            const data = JSON.parse(message.body) as ChatMessage;

            // 🔒 Validate message
            if (!data.id || !data.sender || !data.timestamp) {
              return;
            }

            // 🔁 Tránh xử lý trùng nếu clientId đã xử lý
            if (data.clientId && receivedIdsRef.current.has(data.clientId)) {
              return;
            }

            if (data.clientId) {
              receivedIdsRef.current.add(data.clientId);
            }

            // ✅ Truyền message về ChatBox → sẽ cập nhật status
            onMessage({ ...data, status: "sent" });
          } catch (e) {
          }
        });
      },
    );

    clientRef.current = client;

    return () => {
      if (client.connected) {
        client.disconnect(() => {
        });
      } else {
      }

      hasConnectedRef.current = false;
      receivedIdsRef.current.clear(); // 🧹 reset tránh memory leak
      setConnected(false);
    };
  }, [roomId]);

  const sendMessage = (msg: ChatMessage) => {
    if (clientRef.current?.connected) {
      clientRef.current.send("/app/chat.send", {}, JSON.stringify(msg));
    } else {
    }
  };

  return { sendMessage, connected };
};