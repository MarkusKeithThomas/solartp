package ecommerce.project.service;

import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtorequest.ChatMessageRequest;
import ecommerce.project.dtoresponse.ChatMessageResponse;
import ecommerce.project.dtoresponse.ChatRoomResponse;
import ecommerce.project.entity.ChatMessageEntity;
import org.springframework.data.domain.Pageable;

public interface ChatService {
    CustomPageResponse<ChatRoomResponse> getAllGroupChat(Pageable pageable);
    CustomPageResponse<ChatMessageResponse> getDetailChat(String chatRoomId,Pageable pageable);
    ChatMessageEntity saveChatMessageToDB(ChatMessageRequest request);
    void broadcastToRoom(ChatMessageRequest chat);

}