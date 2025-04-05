import axios from "axios";
import { ChatMessage } from "../components/MessageList";

export interface ChatPaginationResponse {
  content: ChatMessage[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

export const getPaginatedMessages = async (
  roomId: string,
  page = 0,
  size = 10
): Promise<ChatPaginationResponse> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const res = await axios.get(`${API_BASE_URL}/chat/history/paging`, {
    params: { roomId, page, size },
  });
  return res.data.data;
};