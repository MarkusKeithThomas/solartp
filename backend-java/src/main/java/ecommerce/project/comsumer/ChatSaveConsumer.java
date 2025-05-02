package ecommerce.project.comsumer;

import ecommerce.project.config.RabbitMQChatConfig;
import ecommerce.project.dtorequest.ChatMessageRequest;
import ecommerce.project.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@RequiredArgsConstructor
public class ChatSaveConsumer {
    private final ChatService chatService;
    @RabbitListener(queues = RabbitMQChatConfig.QUEUE)
    public void handleSaveChatToDB(ChatMessageRequest request){
        try {
            if (request == null || request.getChatRoomId() == null || request.getContent() == null || request.getSender() == null) {
                log.warn("❌ Dữ liệu ChatMessageRequest không hợp lệ, bỏ qua.");
                return;
            }
            chatService.broadcastToRoom(request);
            chatService.saveChatMessageToDB(request);
            log.info("  ✅  Đã lưu chat xong"+request.getChatRoomId());
        } catch (Exception e) {
            log.error("❌ Lỗi khi xử lý tin nhắn chat:", e);
        }
    }

    }

