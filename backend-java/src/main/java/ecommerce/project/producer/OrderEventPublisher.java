package ecommerce.project.producer;

import ecommerce.project.config.RabbitMQInventoryConfig;
import ecommerce.project.dtorequest.InventoryDeductRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class OrderEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publishOrderCreatedEvent(Long orderId, Map<Long, Integer> productMap) {
        InventoryDeductRequestDTO event = new InventoryDeductRequestDTO(
                orderId,
                productMap.entrySet().stream()
                        .map(e -> new InventoryDeductRequestDTO.ProductQuantity(e.getKey(), e.getValue()))
                        .toList()
        );
        rabbitTemplate.convertAndSend(
                "inventory.deduct.exchange",
                "inventory.deduct",
                event
        );
    }
}
