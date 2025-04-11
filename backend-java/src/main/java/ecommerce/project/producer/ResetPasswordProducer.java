package ecommerce.project.producer;

import ecommerce.project.config.RabbitMQResetConfig;
import ecommerce.project.dtoresponse.ResetPasswordDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ResetPasswordProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendResetPasswordEmail(ResetPasswordDTO dto) {
        rabbitTemplate.convertAndSend(
                RabbitMQResetConfig.EXCHANGE,
                RabbitMQResetConfig.ROUTING_KEY,
                dto
        );
    }
}