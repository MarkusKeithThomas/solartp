package ecommerce.project.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQResetConfig {

    public static final String EXCHANGE = "email.exchange.reset";
    public static final String QUEUE = "reset.queue.email";
    public static final String ROUTING_KEY = "email.reset.password";

    @Bean
    public DirectExchange resetExchange() {
        return new DirectExchange(EXCHANGE);
    }

    @Bean
    public Queue resetQueue() {
        return new Queue(QUEUE, true);
    }

    @Bean
    public Binding resetBinding() {
        return BindingBuilder.bind(resetQueue()).to(resetExchange()).with(ROUTING_KEY);
    }
}