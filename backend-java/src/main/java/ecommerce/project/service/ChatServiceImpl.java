package ecommerce.project.service;


import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtorequest.ChatMessageRequest;
import ecommerce.project.dtoresponse.ChatMessageResponse;
import ecommerce.project.dtoresponse.ChatRoomResponse;
import ecommerce.project.dtoresponse.LastMessage;
import ecommerce.project.entity.ChatMessageEntity;
import ecommerce.project.entity.ChatRoomEntity;
import ecommerce.project.exception.SaveChatToDBException;
import ecommerce.project.repository.ChatMessageRepository;
import ecommerce.project.repository.ChatRoomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public CustomPageResponse<ChatRoomResponse> getAllGroupChat(Pageable pageable) {
        Page<ChatRoomEntity> rooms = chatRoomRepository.findAll(pageable);

        List<ChatRoomResponse> chatRoomResponses = rooms.stream().map(chatRoomEntity -> {
            ChatRoomResponse response = new ChatRoomResponse();
            response.setChatRoomId(chatRoomEntity.getChatRoomId());
            response.setUnreadCount(chatRoomEntity.getUnreadCount());
            response.setPhone(chatRoomEntity.getPhone());
            response.setCreatedAt(chatRoomEntity.getCreatedAt() != null ? chatRoomEntity.getCreatedAt().toString() : null);
            response.setUpdatedAt(chatRoomEntity.getUpdatedAt() != null ? chatRoomEntity.getUpdatedAt().toString() : null);

            ChatMessageEntity lastMessage = chatMessageRepository.findTopByChatRoomIdOrderBySentAtDesc(chatRoomEntity.getChatRoomId());
            if (lastMessage != null) {
                LastMessage last = new LastMessage();
                last.setId(lastMessage.getId().intValue());
                last.setSender(lastMessage.getSender());
                last.setContent(lastMessage.getContent());
                last.setTimestamp(lastMessage.getSentAt() != null ? lastMessage.getSentAt().toString() : null);
                last.setAvatarUrl(lastMessage.getAvatarUrl());
                response.setLastMessage(last);
            }

            return response;
        }).toList();

        return new CustomPageResponse<>(
                chatRoomResponses,
                rooms.getNumber(),         // page hiện tại
                rooms.getSize(),           // size mỗi trang
                rooms.getTotalElements(),  // tổng số phần tử
                rooms.getTotalPages(),     // tổng số trang
                rooms.isLast(),            // có phải trang cuối không
                rooms.isFirst()            // có phải trang đầu tiên không
        );
    }

    @Override
    public CustomPageResponse<ChatMessageResponse> getDetailChat(String chatRoomId, Pageable pageable) {
        Page<ChatMessageEntity> chats = chatMessageRepository.findByChatRoomIdOrderBySentAtDesc(chatRoomId, pageable);
        List<ChatMessageResponse> list = chats.stream().map(message -> {
            ChatMessageResponse chat = new ChatMessageResponse();
            chat.setId(message.getId());
            chat.setSender(message.getSender());
            chat.setContent(message.getContent());
            chat.setMessageType(message.getMessageType());
            chat.setSentAt(message.getSentAt());
            chat.setAvatarUrl(message.getAvatarUrl());
            chat.setRead(message.getIsRead());
            return chat;
        }).toList();

        return new CustomPageResponse<>(
                list,
                chats.getNumber(),
                chats.getSize(),
                chats.getTotalElements(),
                chats.getTotalPages(),
                chats.isLast(),
                chats.isFirst()
        );
    }

    @Override
    @Transactional
    public ChatMessageEntity saveChatMessageToDB(ChatMessageRequest request) {
        if (request.getChatRoomId() == null || request.getContent() == null || request.getSender() == null) {
            throw new IllegalArgumentException("Thiếu thông tin bắt buộc: chatRoomId, content hoặc sender");
        }

        // Kiểm tra hoặc tạo mới ChatRoom
        ChatRoomEntity chatRoom = chatRoomRepository.findByChatRoomId(request.getChatRoomId())
                .orElseGet(() -> {
                    ChatRoomEntity newRoom = new ChatRoomEntity();
                    newRoom.setChatRoomId(request.getChatRoomId());
                    newRoom.setUnreadCount(0);
                    newRoom.setPhone(request.getPhone());
                    newRoom.setSellerId(100);
                    newRoom.setLastMessageId(null);
                    return chatRoomRepository.save(newRoom);
                });

        // Tạo ChatMessageEntity
        ChatMessageEntity message = new ChatMessageEntity();
        message.setChatRoomId(chatRoom.getChatRoomId());
        message.setMessageType("TEXT");
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setClientId(request.getClientId()); // TODO: Cập nhật nếu có IP
        message.setAvatarUrl(""); // TODO: Nếu có ảnh

        ChatMessageEntity savedMessage = chatMessageRepository.save(message);

        // 🔁 Cập nhật tin nhắn cuối cùng
        chatRoom.setLastMessageId(savedMessage.getId());
        chatRoomRepository.save(chatRoom);
        // Lưu message vào DB
        return savedMessage;
    }

    @Override
    public void broadcastToRoom(ChatMessageRequest message) {
        if(message == null) return;
        ChatMessageResponse res = mapToResponse(message);
        messagingTemplate.convertAndSend(
                "/topic/chat/"+message.getChatRoomId(),res);
        System.out.println("📤 Đã gửi về client: " + res.getContent());
    }
    private ChatMessageResponse mapToResponse(ChatMessageRequest chatMessage){
        ChatMessageResponse res = new ChatMessageResponse();
        res.setChatRoomId(chatMessage.getChatRoomId());
        res.setContent(chatMessage.getContent());
        res.setSender(chatMessage.getSender());
        res.setSentAt(Instant.now());
        res.setClientId(chatMessage.getClientId());
        res.setMessageType(chatMessage.getMessageType());
        res.setStatus("sent");
        res.setClientId(chatMessage.getClientId());

        return res;
    }
}