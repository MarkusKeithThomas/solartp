package ecommerce.project.producer;

import ecommerce.project.config.RabbitMQInventoryConfig;
import ecommerce.project.dtorequest.InventoryDeductRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventoryProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendInventoryDeductRequest(InventoryDeductRequestDTO dto) {
        rabbitTemplate.convertAndSend(
                RabbitMQInventoryConfig.EXCHANGE,
                RabbitMQInventoryConfig.ROUTING_KEY,
                dto
        );
    }
}
