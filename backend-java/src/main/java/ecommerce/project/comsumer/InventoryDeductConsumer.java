package ecommerce.project.comsumer;

import ecommerce.project.config.RabbitMQInventoryConfig;
import ecommerce.project.dtorequest.InventoryDeductRequestDTO;
import ecommerce.project.repository.OrderRepository;
import ecommerce.project.repository.ProductRepository;
import ecommerce.project.service.StockRedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class InventoryDeductConsumer {

    private final StockRedisService stockRedisService;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @RabbitListener(queues = RabbitMQInventoryConfig.QUEUE)
    public void handleInventoryDeductConsumer(InventoryDeductRequestDTO request) {
        try {
            Map<Long, Integer> productMap = request.getItems().stream()
                    .collect(Collectors.toMap(
                            InventoryDeductRequestDTO.ProductQuantity::getProductId,
                            InventoryDeductRequestDTO.ProductQuantity::getQuantity
                    ));
            for (Map.Entry<Long,Integer> entry: productMap.entrySet()){
                Long productId = entry.getKey();
                Integer quantity = entry.getValue();
                productRepository.findById(productId).ifPresent(product -> {
                    int current = product.getStockQuantity();
                    product.setStockQuantity(current - quantity);
                    product.setSoldQuantity(product.getSoldQuantity() + quantity);
                    productRepository.save(product);
                    log.info("✅ Trừ kho MySQL productId={}, quantity={}", productId, quantity);
                });

            }
            // TODO: lưu log vào bảng `stock_delta_log`
        } catch (Exception e){
            log.error("❌ Lỗi khi trừ kho từ DB: {}", e.getMessage(), e);
            throw e;
        }
    }
}
