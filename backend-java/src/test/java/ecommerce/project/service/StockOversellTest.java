package ecommerce.project.service;

import ecommerce.project.model.StockCheckResult;
import ecommerce.project.utils.RedisKeyPrefix;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class StockOversellTest {


    private static final Long PRODUCT_ID = 2L;
    private static final int INITIAL_STOCK = 90000;
    private static final int TOTAL_REQUESTS = 100000;

    private final StockRedisService stockRedisService;
    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    public StockOversellTest(
            StockRedisService stockRedisService,
            @Qualifier("stockRedisTemplate") RedisTemplate<String, String> redisTemplate) {
        this.stockRedisService = stockRedisService;
        this.redisTemplate = redisTemplate;
    }

    @BeforeEach
    public void setup() {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + PRODUCT_ID;
        redisTemplate.opsForValue().set(key, String.valueOf(INITIAL_STOCK));
    }

    @Test
    public void testPreventOversell() throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(50);
        CountDownLatch latch = new CountDownLatch(TOTAL_REQUESTS);

        AtomicInteger successCount = new AtomicInteger();
        AtomicInteger failedCount = new AtomicInteger();

        for (int i = 0; i < TOTAL_REQUESTS; i++) {
            executorService.submit(() -> {
                try {
                    StockCheckResult result = stockRedisService.hasEnoughStock(PRODUCT_ID, 1);
                    if (result == StockCheckResult.ENOUGH) {
                        long res = stockRedisService.decrementStock(PRODUCT_ID, 1);
                        if (res >= 0) {
                            successCount.incrementAndGet();
                        } else {
                            failedCount.incrementAndGet();
                        }
                    } else {
                        failedCount.incrementAndGet();
                    }
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        executorService.shutdown();

        System.out.println("✅ Thành công: " + successCount.get());
        System.out.println("❌ Thất bại  : " + failedCount.get());

        assertEquals(INITIAL_STOCK, successCount.get(), "Số lượng đơn thành công phải bằng số tồn kho ban đầu");
    }
}
