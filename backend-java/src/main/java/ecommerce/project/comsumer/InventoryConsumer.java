package ecommerce.project.comsumer;

import ecommerce.project.config.RabbitMQInventoryConfig;
import ecommerce.project.dtorequest.InventoryDeductRequestDTO;
import ecommerce.project.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class InventoryConsumer {

    private final InventoryService inventoryService;

    @RabbitListener(queues = RabbitMQInventoryConfig.QUEUE)
    public void handleInventoryDeduction(InventoryDeductRequestDTO dto) {
        log.info("📦 Nhận yêu cầu trừ kho cho đơn hàng: {}", dto.getOrderId());
        inventoryService.deductStock(dto);
    }
}
