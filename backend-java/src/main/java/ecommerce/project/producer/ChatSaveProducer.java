package ecommerce.project.producer;

import ecommerce.project.config.RabbitMQChatConfig;
import ecommerce.project.config.RabbitMQConfig;
import ecommerce.project.dtorequest.ChatMessageRequest;
import ecommerce.project.dtoresponse.OrderEmailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatSaveProducer {

    private final RabbitTemplate rabbitTemplate;

    public void saveMessageToDB(ChatMessageRequest chatMessageRequest){
        rabbitTemplate.convertAndSend(
                RabbitMQChatConfig.EXCHANGE,
                RabbitMQChatConfig.ROUTING_KEY,
                chatMessageRequest
        );
    }
}
