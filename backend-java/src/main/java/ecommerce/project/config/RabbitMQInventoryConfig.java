package ecommerce.project.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQInventoryConfig {

    public static final String EXCHANGE = "inventory.deduct.exchange";
    public static final String QUEUE = "inventory.queue.deduct";
    public static final String ROUTING_KEY = "inventory.deduct";

    @Bean
    public DirectExchange inventoryExchange() {
        return new DirectExchange(EXCHANGE);
    }

    @Bean
    public Queue inventoryQueue() {
        return new Queue(QUEUE, true);
    }

    @Bean
    public Binding inventoryBinding() {
        return BindingBuilder.bind(inventoryQueue()).to(inventoryExchange()).with(ROUTING_KEY);
    }
}