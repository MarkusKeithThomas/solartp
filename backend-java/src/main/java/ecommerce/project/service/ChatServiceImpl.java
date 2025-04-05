package ecommerce.project.service;

import com.google.gson.Gson;
import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtorequest.ChatRequestDTO;
import ecommerce.project.dtoresponse.ChatResponseDTO;
import ecommerce.project.entity.ChatEntity;
import ecommerce.project.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import static ecommerce.project.utils.DateTimeUtils.formatToVietnamTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public ChatEntity saveMessage(ChatRequestDTO request, String ipAddress) {
        // ✅ Nếu clientId đã tồn tại → gửi lại tin cũ
        if (request.getClientId() != null) {
            Optional<ChatEntity> existed = chatRepository.findByClientId(request.getClientId());
            if (existed.isPresent()) {
                ChatEntity oldMessage = existed.get();
                if (isValidEntity(oldMessage)) {
                    sendMessageToRoom(oldMessage);
                    System.out.println("🟡 Đã tồn tại message → gửi lại clientId: " + request.getClientId());
                } else {
                    System.err.println("⚠️ Tin nhắn cũ tồn tại nhưng thiếu dữ liệu → KHÔNG gửi lại");
                }
                return null;
            }
        }
        // ✅ Tạo message mới
        ChatEntity entity = new ChatEntity();
        entity.setChatRoomId(request.getChatRoomId());
        entity.setSender(request.getSender());
        entity.setContent(request.getContent());
        entity.setClientId(request.getClientId());
        entity.setSenderIp(ipAddress);
        entity.setTimestamp(Instant.now());
        entity.setRead(false);

        ChatEntity saved = chatRepository.save(entity);

        // ✅ Gửi realtime
        sendMessageToRoom(saved);
        return saved;
    }

    @Override
    public void sendMessageToRoom(ChatEntity message) {
        if (message == null){
            return;
        }
        try {
            ChatResponseDTO response = toResponseDTO(message);

            // ⚠️ Kiểm tra dữ liệu hợp lệ trước khi gửi WebSocket
            if (response.getChatRoomId() == null || response.getSender() == null || response.getContent() == null) {
                return;
            }
            System.out.println("📤 Gửi message WebSocket với clientId: " + message.getClientId());


            messagingTemplate.convertAndSend(
                    "/topic/chat/" + message.getChatRoomId(),
                    response
            );

        } catch (Exception e) {
            System.err.println("❌ Lỗi gửi message đến WebSocket: " + e.getMessage());
        }
    }

    private boolean isValidEntity(ChatEntity entity) {
        return entity.getChatRoomId() != null &&
                entity.getSender() != null &&
                entity.getContent() != null &&
                entity.getTimestamp() != null;
    }

    @Override
    public List<ChatResponseDTO> getMessagesByRoomId(String chatRoomId) {
        return chatRepository.findByChatRoomIdOrderByTimestampAsc(chatRoomId)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getChatRoomIdsByUser(Long userId) {
        return chatRepository.findChatRoomIdsByUser(userId);
    }

    @Override
    public String createOrGetChatRoom(long buyerId, long sellerId) {
        return "chat_user_" + buyerId + "_" + sellerId;
    }

    @Override
    public void markMessagesAsRead(String chatRoomId, String reader) {
        List<ChatEntity> unreadMessages = chatRepository.findUnreadMessages(chatRoomId, reader);
        unreadMessages.forEach(msg -> msg.setRead(true));
        chatRepository.saveAll(unreadMessages);
    }

    @Override
    public int countUnreadMessages(String chatRoomId, String receiver) {
        return chatRepository.countByChatRoomIdAndSenderNotAndIsReadFalse(chatRoomId, receiver);
    }

    @Override
    public ChatResponseDTO toResponseDTO(ChatEntity entity) {
        ChatResponseDTO chatResponseDTO = new ChatResponseDTO();
        chatResponseDTO.setId(String.valueOf(entity.getId()));
        chatResponseDTO.setClientId(entity.getClientId());
        chatResponseDTO.setChatRoomId(entity.getChatRoomId());
        chatResponseDTO.setTimestamp(String.valueOf(formatToVietnamTime(entity.getTimestamp())));
        chatResponseDTO.setContent(entity.getContent());
        chatResponseDTO.setAvatarUrl("");
        chatResponseDTO.setSender(entity.getSender());
        return chatResponseDTO;
    }

    @Override
    public CustomPageResponse<ChatResponseDTO> getPagedMessages(String roomId, Pageable pageable) {
        Page<ChatEntity> page = chatRepository.findByChatRoomId(roomId, pageable);
        System.out.println("💾 Tổng tin nhắn: " + roomId);
        List<ChatResponseDTO> data = page.getContent().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());

        return new CustomPageResponse<>(
                data,
                page.getNumber(),          // current page
                page.getSize(),            // size per page
                page.getTotalElements(),   // total elements
                page.getTotalPages(),      // total pages
                page.isLast(),             // is last page
                page.isFirst()             // is first page
        );
    }
}