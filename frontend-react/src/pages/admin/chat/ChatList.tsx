import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { ChatRoom } from '../../../type/admin/chat';


interface Props {
    chatRooms: ChatRoom[];
    onSelectRoom: (roomId: string) => void;
    selectedRoomId: string | null;
}

const ChatList = ({ chatRooms,onSelectRoom,selectedRoomId }: Props) => {
    useEffect(() => {
    }, [chatRooms]);

  return (
    <div className="border-end" style={{ width: 300, overflowY: "auto" }}>
      <ListGroup variant="flush">
        {chatRooms.map((room) => (
          <ListGroup.Item key={room.chatRoomId}
            onClick={() => onSelectRoom(room.chatRoomId)}
            active={room.chatRoomId === selectedRoomId }
            >
            <div className="fw-bold">{room.phone}</div>
            <div className="small text-muted">{room.lastMessage?.content ?? "chưa có tin nhắn mới"}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ChatList;