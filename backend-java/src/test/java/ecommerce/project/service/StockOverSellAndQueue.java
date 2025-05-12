package ecommerce.project.service;

import ecommerce.project.dtorequest.InventoryDeductRequestDTO;
import ecommerce.project.utils.RedisKeyPrefix;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

@SpringBootTest
@Slf4j
public class StockOverSellAndQueue {

    private final RedisTemplate<String, String> redisTemplate;

    private final StockRedisService stockRedisService;

    private final RabbitTemplate rabbitTemplate;

    @Autowired
    public StockOverSellAndQueue( @Qualifier("stockRedisTemplate") RedisTemplate<String, String> redisTemplate,
                                  StockRedisService stockRedisService,
                                  RabbitTemplate rabbitTemplate) {
        this.redisTemplate = redisTemplate;
        this.stockRedisService = stockRedisService;
        this.rabbitTemplate = rabbitTemplate;
    }

    private static final String STOCK_KEY = RedisKeyPrefix.STOCK_KEY_PREFIX + "2";

    @Test
    void simulateFlashSaleWithQueue() throws InterruptedException {
        int initialStock = 10001;
        int userCount = 10000;

        // ✅ 1. Set lại stock trong Redis
        redisTemplate.opsForValue().set(STOCK_KEY, String.valueOf(initialStock));

        ExecutorService executor = Executors.newFixedThreadPool(50);
        CountDownLatch latch = new CountDownLatch(userCount);
        AtomicInteger success = new AtomicInteger(0);
        AtomicInteger queueSent = new AtomicInteger(0);

        for (int i = 0; i < userCount; i++) {
            executor.submit(() -> {
                try {
                    // ✅ 2. Trừ kho trong Redis (Lua Script)
                    long result = stockRedisService.decrementStock(2L, 1);
                    if (result >= 0) {
                        success.incrementAndGet();

                        // ✅ 3. Gửi message vào RabbitMQ để xử lý logic DB
                        rabbitTemplate.convertAndSend(
                                "inventory.deduct.exchange",
                                "inventory.deduct",
                                new InventoryDeductRequestDTO(
                                        1L,
                                        List.of(new InventoryDeductRequestDTO.ProductQuantity(2L, 1))
                                )
                        );
                        queueSent.incrementAndGet();
                    }
                } catch (Exception e) {
                    log.error("❌ Lỗi thread", e);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        executor.shutdown();

        String finalStock = redisTemplate.opsForValue().get(STOCK_KEY);

        System.out.println("🧪 Tổng số khách: " + userCount);
        System.out.println("✅ Thành công: " + success.get());
        System.out.println("📦 Đã gửi queue: " + queueSent.get());
        System.out.println("📉 Stock Redis còn lại: " + finalStock);
    }
}
