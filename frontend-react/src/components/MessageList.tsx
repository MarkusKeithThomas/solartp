import React from "react";
import { ChatMessage } from "../type/admin/chat";
import { formatVietnameseTime } from '../ultities/fotmatDateTime';

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
          key={`${msg.id || msg.clientId || "tmp"}-${msg.sentAt}-${msg.content.length}`}            className={`d-flex ${
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
                {formatVietnameseTime(msg.sentAt)}
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
