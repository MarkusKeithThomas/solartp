package ecommerce.project.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String EXCHANGE = "email.exchange";
    public static final String QUEUE = "order.queue.email";
    public static final String ROUTING_KEY = "email.order.confirmed";

    @Bean
    public DirectExchange emailExchange() {
        return new DirectExchange(EXCHANGE);
    }

    @Bean
    public Queue orderEmailQueue() {
        return new Queue(QUEUE, true);
    }

    @Bean
    public Binding orderEmailBinding() {
        return BindingBuilder.bind(orderEmailQueue())
                .to(emailExchange())
                .with(ROUTING_KEY);
    }
}
