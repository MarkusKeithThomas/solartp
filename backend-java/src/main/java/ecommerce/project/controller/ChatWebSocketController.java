package ecommerce.project.controller;

import ecommerce.project.dtorequest.ChatRequestDTO;
import ecommerce.project.entity.ChatEntity;
import ecommerce.project.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatService chatService;
    @MessageMapping("/chat.send")
    public void handleChatMessage(@Payload ChatRequestDTO message, SimpMessageHeaderAccessor headerAccessor) {
        String ip = "unknown";
        if (headerAccessor.getSessionAttributes() != null) {
            ip = (String) headerAccessor.getSessionAttributes().getOrDefault("ip", "unknown");
        }

        try {
            ChatEntity saved = chatService.saveMessage(message, ip);

            if (saved != null) {
                chatService.sendMessageToRoom(saved);
            } else {
                System.out.println("🟡 Đã gửi lại message có clientId trùng → bỏ qua send lại lần nữa");
            }

        } catch (Exception e) {
            System.err.println("❌ Lỗi khi xử lý chat: ChatWebSocketController  " + e.getMessage());
        }
    }
}