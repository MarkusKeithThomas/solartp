import { useEffect, useState } from "react";
import ChatList from "./chat/ChatList";
import { ChatRoom } from "../../type/admin/chat";
import { chatApi } from "../../api/chatApi";
import ChatBoxAdmin from './chat/ChatBoxAdmin.tsx';

const ChatPage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await chatApi.getChatRooms();
        setChatRooms(rooms.content);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };
    fetchChatRooms();
  }, [chatRooms]);

  return (
    <div className="d-flex" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
  {/* Sidebar ChatList */}
  <div
    style={{
      width: "300px",
      minWidth: "300px",
      maxWidth: "300px",
      height: "100%",
      borderRight: "1px solid #ccc",
      overflowY: "auto",
    }}
  >
    <ChatList
      chatRooms={chatRooms}
      onSelectRoom={(roomId) => setSelectedRoomId(roomId)}
      selectedRoomId={selectedRoomId}
    />
  </div>

  {/* Khu vực nội dung ChatBox */}
  <div className="flex-grow-1 d-flex flex-column" style={{ height: "100%", overflow: "auto" }}>
    {selectedRoomId ? (
      <ChatBoxAdmin 
      chatRoomId={selectedRoomId} 
      phone={chatRooms.find(room => room.chatRoomId === selectedRoomId)?.phone || "Ẩn Danh"}
      />
    ) : (
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <h5>🛋️ Chọn 1 cuộc trò chuyện để bắt đầu</h5>
      </div>
    )}
  </div>
</div>
  );
};

export default ChatPage;
