package ecommerce.project.comsumer;

import ecommerce.project.config.RabbitMQConfig;
import ecommerce.project.dtoresponse.OrderEmailDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailConsumer {

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void handleOrderEmail(OrderEmailDTO dto) {
        log.info("✅ Đã nhận yêu cầu gửi email xác nhận cho đơn hàng: {}", dto.getOrderCode());
        // Mô phỏng gửi email
        log.info("📧 Gửi email đến: {}, tổng tiền: {}",
                dto.getCustomerEmail(), dto.getTotalAmount());
    }
}
