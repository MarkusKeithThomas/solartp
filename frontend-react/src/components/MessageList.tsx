import React from "react";

// ✅ Định nghĩa kiểu dữ liệu tin nhắn
export interface ChatMessage {
  id?: string; // từ backend trả về
  chatRoomId: string;
  sender: string;
  content: string;
  timestamp: string;
  avatarUrl?: string;

  // 🔧 Thêm 2 trường bên dưới để fix lỗi:
  clientId?: string; // UUID do frontend tạo để đồng bộ tin nhắn
  status?: "sending" | "sent"; // Trạng thái tin nhắn
}

interface MessageListProps {
  messages: ChatMessage[];
  currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  return (
    <div className="d-flex flex-column gap-2">
      {messages.map((msg) => {
        const isOwn = msg.sender === currentUser;

        return (
          <div
          key={`${msg.id || msg.clientId || "tmp"}-${msg.timestamp}-${msg.content.length}`}            className={`d-flex ${
              isOwn ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 rounded shadow-sm ${
                isOwn ? "bg-primary text-white" : "bg-light text-dark"
              }`}
              style={{ maxWidth: "75%", position: "relative" }}
            >
              {/* <div className="fw-bold small mb-1">
                {isOwn ? "Bạn" : `👤 ${msg.sender}`}
              </div> */}

              <div>{msg.content}</div>

              <div className="text-end small text-muted mt-1">
                {new Date(msg.timestamp).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "Asia/Ho_Chi_Minh", // ✅ Thêm dòng này để hiển thị đúng giờ Việt Nam
                })}

                {/* Trạng thái đang gửi */}
                {msg.status === "sending" ? (
                  <span className="ms-2 small">⏳ Đang gửi...</span>
                ) : (
                  <span className="ms-2 small">sent</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
