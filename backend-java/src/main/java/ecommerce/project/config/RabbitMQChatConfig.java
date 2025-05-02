package ecommerce.project.config;

import com.rabbitmq.client.AMQP;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQChatConfig {
    public static final String EXCHANGE = "chat.exchange.message";
    public static final String QUEUE = "chat.queue.admin.user";
    public static final String ROUTING_KEY = "chat.admin.to.user";

    @Bean
    public DirectExchange chatExchange(){
        return new DirectExchange(EXCHANGE,true,false);
    }

    @Bean
    public Queue chatQueue(){
        return new Queue(QUEUE,true);
    }

    @Bean
    public Binding chatBinding(){
        return BindingBuilder.bind(chatQueue()).to(chatExchange()).with(ROUTING_KEY);
    }
}
