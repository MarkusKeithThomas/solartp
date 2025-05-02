export interface LastMessage{
    id: number;
    sender:string;
    content:string;
    timestamp:string;
    avatarUrl:string;
}
export interface ChatRoom{
    chatRoomId: string;
    phone:string;
    lastMessage: LastMessage;
    unreadCount: number;
    createdAt:string;
    updatedAt:string;

}
export interface ChatMessageGroup{
    content:ChatRoom[];
    page: number;
    size: number;
    totalPages:number;
    totalElements:number;
    last: boolean;
    first:boolean;
}
// export interface ChatMessageDetail{
//     id: number;
//     chatRoomId:string;
//     sender:string;
//     content:string;
//     messageType:string;
//     sentAt:string;
//     senderIp:string;
//     avatarUrl:string;
//     read:boolean;
//     status?: "sent" | "sending" | "failed" | "received";
// }

export interface ChatMessageDetailGroup{
    content:ChatMessage[];
    page: number;
    size: number;
    totalPages:number;
    totalElements:number;
    last: boolean;
    first:boolean;
}


// ✅ Định nghĩa kiểu dữ liệu tin nhắn trực tiếp
export interface ChatMessage {
  id?: string; // từ backend trả về
  chatRoomId: string;
  sender: string;
  phone?:string;
  content: string;
  avatarUrl?: string;
  clientId?: string; // UUID do frontend tạo để đồng bộ tin nhắn
  status?: "sending" | "sent"; // Trạng thái tin nhắn
  messageType:string;
  sentAt?:string;
  senderIp?:string;
  read:boolean;
}


