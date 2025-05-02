package ecommerce.project.controller;

import ecommerce.project.dtorequest.ChatMessageRequest;
import ecommerce.project.dtorequest.ChatRequestDTO;
import ecommerce.project.producer.ChatSaveProducer;
import ecommerce.project.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {
        private final ChatSaveProducer chatSaveProducer;

        @MessageMapping("/chat.send")
        public void sendMessage(
                @Payload @Validated ChatMessageRequest request
        ){
                if(request.getChatRoomId() == null
                        || request.getContent() == null
                        || request.getSender() == null){
                        return;
                }
                chatSaveProducer.saveMessageToDB(request);

        }
}