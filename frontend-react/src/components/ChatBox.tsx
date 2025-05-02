import React, { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import { useChatSocket } from "../hook/useChatSocket";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "react-bootstrap";
import { ChatMessage } from "../type/admin/chat";
import { chatApi } from "../api/chatApi";

interface ChatBoxProps {
  roomId: string;
  senderId: string;
  show: boolean;
  onClose: () => void;
}

const PAGE_SIZE = 10;

const ChatBox: React.FC<ChatBoxProps> = ({ roomId, senderId, show, onClose }) => {
  if (!show) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const userChat = localStorage.getItem("user-chat");
  const userChatParsed = userChat ? JSON.parse(userChat) : null;
  const phone = userChatParsed?.phone || "Ẩn Danh";
  const sender = userChatParsed?.name || "Ẩn Danh";

  const { sendMessage, connected } = useChatSocket(roomId, (incoming) => {
    setMessages((prev) => {
      if (incoming.clientId) {
        const index = prev.findIndex((m) => m.clientId === incoming.clientId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = { ...updated[index], ...incoming, status: "sent" };
          return updated;
        }
      }
    
      // Nếu tin nhắn đã có id → tránh trùng
      if (incoming.id && prev.some((m) => m.id === incoming.id)) {
        return prev;
      }
    
      // Thêm tin nhắn mới vào cuối (realtime từ người khác)
      return [...prev, { ...incoming, status: "sent" }];
    });
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async (pageToLoad = 0) => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await chatApi.getPaginatedMessagesByPhone(roomId, pageToLoad, PAGE_SIZE);
  
      // 👉 Đảo ngược để tin nhắn cũ hơn ở đầu, mới hơn ở dưới
      const reversed = [...res.content].reverse();
  
      setMessages((prev) => [...reversed, ...prev]);
      setHasMore(!res.last);
      setPage(pageToLoad + 1);
    } catch (err) {
      console.error("❌ Lỗi load tin nhắn:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) loadMessages();
  }, [show]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop } = containerRef.current;
    if (scrollTop < 30 && hasMore && !loadingRef.current) {
      loadMessages(page);
    }
  };

  const handleSend = (content: string) => {
    const clientId = uuidv4();
    const tempMessage: ChatMessage = {
      chatRoomId: roomId,
      sender: senderId,
      phone:phone,
      content:content,
      sentAt: new Date().toISOString(),
      avatarUrl: "/imgs/logo_tpsolar.webp",
      status: "sending",
      clientId: clientId,
      messageType: "text", // Assuming "text" as the default message type
      read: false, // Assuming the message is unread initially
    };
    setMessages((prev) => [...prev, tempMessage]);
    sendMessage({ ...tempMessage, id: undefined });
  };

  return (
    <div
      className="card shadow border-0"
      style={{
        width: "320px",
        maxWidth: "90vw",
        height: "420px",
        position: "fixed",
        bottom: "80px",
        right: "20px",
        zIndex: 1050,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="bg-danger text-white p-2 d-flex justify-content-between align-items-center rounded-top">
        <strong>💬 Chat với nhân viên SolarTP</strong>
        <button onClick={onClose} className="btn btn-sm btn-light text-danger fw-bold">×</button>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-grow-1 overflow-auto px-2 py-2"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        {loading && <Spinner />}
        <MessageList messages={messages} currentUser={senderId} />
        <div ref={messagesEndRef} />
      </div>

      <div className="border-top p-2">
        <ChatInput 
        onSend={handleSend} 
        disabled={!connected} />
      </div>
    </div>
  );
};

export default ChatBox;
