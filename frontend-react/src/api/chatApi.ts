import axios from "axios";
import { ChatMessage, ChatMessageDetailGroup, ChatMessageGroup } from "../type/admin/chat";
import { apiGet } from "./apiClient";

export interface ChatPaginationResponse {
  content: ChatMessage[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}


export const chatApi = {
  getChatRooms: (): Promise<ChatMessageGroup> => {
    return apiGet<ChatMessageGroup>("/chat/groups-chat");
  },
  getPaginatedMessages: (chatRoomId:string,page:number,size:number): Promise<ChatMessageDetailGroup>=>{
    return apiGet<ChatMessageDetailGroup>("/chat/detail-chat",{
      chatRoomId, page, size
    });
  },
  getPaginatedMessagesByPhone:(chatRoomId:string,page:number,size:number):Promise<ChatMessageDetailGroup>=>{
    return apiGet<ChatMessageDetailGroup>("/chat/detail-chat",{
      chatRoomId, page, size
    });
  }

};

