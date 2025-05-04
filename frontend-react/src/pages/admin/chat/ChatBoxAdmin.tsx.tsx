import { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { chatApi } from "../../../api/chatApi";
import { ChatMessage } from "../../../type/admin/chat";
import "../../../styles/message.css";
import { v4 as uuidv4 } from "uuid";
import { useChatSocket } from "../../../hook/useChatSocket";
import {
  formatVietnameseTime,
} from "../../../ultities/fotmatDateTime";

interface Props {
  chatRoomId: string;
  phone: string | "Ẩn Danh";
}

export const ChatBoxAdmin = ({ chatRoomId, phone }: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const [size] = useState<number>(100);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const dataSender = localStorage.getItem("user-info-admin");
  const sender = dataSender ? JSON.parse(dataSender) : null;
  const senderEmail = sender?.email; // 👉 lấy tên

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const res = await chatApi.getPaginatedMessages(chatRoomId, 0, size);
        setTotalPage(res.totalPages);
        setMessages(res.content.slice().reverse());        
        setPage(1);

        setTimeout(() => {
          scrollToBottom();
        }, 500);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };
    fetchChatMessages();
  }, [chatRoomId]);

  const { sendMessage, connected } = useChatSocket(chatRoomId, (incoming) => {
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMoreMessages = async () => {
    if (page >= totalPage || loadingRef.current) return;
    loadingRef.current = true;
    setLoadingMore(true);
    try {
      const res = await chatApi.getPaginatedMessages(
        chatRoomId,
        page,
        size
      );

        setMessages((prev) => [...res.content, ...prev]);
        setHasMore(!res.last);
        setPage(page+1);
      
    } catch (error) {
      console.error("Error loading more messages:", error);
    } finally {
      loadingRef.current = false;
      setLoadingMore(false);
    }
  };


  useEffect(() => {
    if (!loadingMore) {
      scrollToBottom();
    }
  }, [messages, loadingMore]);


  const handleScroll = () => {
    if (!scrollContainerRef.current || loadingMore) return;
    const { scrollTop } = scrollContainerRef.current;
    if (scrollTop === 0) {
      loadMoreMessages();
    }
  };
  
  const handleSend = () => {
    if (!newMessage.trim()) {
      return; // Không gửi tin nhắn trống
    }

    if (!connected) {
      alert("Không thể gửi tin nhắn, vui lòng kiểm tra lại kết nối");
      return;
    }
    // Tạo một clientId mới cho tin nhắn
    const clientId = uuidv4();
    const tempMessage: ChatMessage = {
      chatRoomId: chatRoomId,
      sender: senderEmail || "Default", //TODO kiem tra lai id de xac nhan ai la nguoi gui
      phone: phone,
      content: newMessage,
      sentAt: new Date().toISOString(),
      clientId: clientId,
      status: "sending",
      messageType: "text", // Assuming "text" as a default type
      read: false, // Assuming the message is unread initially
    };

    setMessages((prev) => [...prev,tempMessage]); // Thêm tin nhắn tạm thời vào danh sách
    sendMessage(tempMessage); // Gửi tin nhắn qua socket
    setNewMessage(""); // Clear the input field after sending
  };

  return (
    <div
      className="flex-grow-1 d-flex flex-column"
      style={{ height: "100%", minHeight: 0 }}
    >
      <div className="bg-white">
        <h3 className="ms-3">{phone}</h3>
      </div>
      <div
        key={chatRoomId}
        className="flex-grow-1 p-3 d-flex flex-column"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={{ overflowY: "auto", minWidth: 0 }}
      >
        {messages
          .map((msg,index) => (
            <div
            key={msg.clientId || msg.id || `fallback-${index}`} // 👈 đảm bảo key luôn có
            className={`d-flex mb-2 ${
                msg.sender === senderEmail
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded-3 shadow-sm ${
                  msg.sender === senderEmail
                    ? "bg-primary text-white"
                    : "bg-light text-dark"
                }`}
                style={{ maxWidth: "70%", wordBreak: "break-word" }}
              >
                <div className="small mb-1 fw-bold fst-italic small text-muted mb-0">
                  {msg.sender}
                </div>
                <div>{msg.content}</div>
                <p className="fst-italic small text-muted mb-0 text-end">
                  {formatVietnameseTime(msg.sentAt)}
                </p>
              </div>
            </div>
          ))}


        <div ref={bottomRef}></div>
      </div>
      <div className="p-3 border-top">
        <Form
          className="d-flex gap-2 mb-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Form.Control
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <Button type="submit" 
          onClick={handleSend}>
            Gửi
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChatBoxAdmin;
