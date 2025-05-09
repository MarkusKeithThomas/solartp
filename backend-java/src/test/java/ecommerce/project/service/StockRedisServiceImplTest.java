package ecommerce.project.service;

import ecommerce.project.entity.ProductEntity;
import ecommerce.project.exception.StockException;
import ecommerce.project.model.StockCheckResult;
import ecommerce.project.repository.ProductRepository;
import ecommerce.project.utils.RedisKeyPrefix;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class StockRedisServiceImplTest {

    @InjectMocks
    private StockRedisServiceImpl stockRedisService;

    @Mock
    private RedisTemplate<String, String> redisTemplate;

    @Mock
    private ValueOperations<String, String> valueOps;

    @Mock
    private ProductRepository productRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        when(redisTemplate.opsForValue()).thenReturn(valueOps);
    }

    @Test
    void testHasEnoughStock_EnoughInRedis() {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + "1";
        when(valueOps.get(key)).thenReturn("10");

        StockCheckResult result = stockRedisService.hasEnoughStock(1L, 5);

        assertEquals(StockCheckResult.ENOUGH, result);
    }

    @Test
    void testHasEnoughStock_NotEnoughInRedis() {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + "1";
        when(valueOps.get(key)).thenReturn("2");

        StockCheckResult result = stockRedisService.hasEnoughStock(1L, 5);

        assertEquals(StockCheckResult.NOT_ENOUGH, result);
    }

    @Test
    void testHasEnoughStock_KeyNotFound() {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + "1";
        when(valueOps.get(key)).thenReturn(null);

        StockCheckResult result = stockRedisService.hasEnoughStock(1L, 5);

        assertEquals(StockCheckResult.NOT_FOUND, result);
    }

    @Test
    void testHasEnoughStock_FallbackToDB_WhenRedisFails() {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + "1";
        when(valueOps.get(key)).thenThrow(new RedisConnectionFailureException("Redis down"));

        ProductEntity product = new ProductEntity();
        product.setStockQuantity(10);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        StockCheckResult result = stockRedisService.hasEnoughStock(1L, 5);

        assertEquals(StockCheckResult.ENOUGH, result);
    }

    @Test
    void testHasEnoughStock_InvalidProductId_ShouldThrowException() {
        assertThrows(StockException.class, () -> stockRedisService.hasEnoughStock(0L, 5));
    }

    @Test
    void testHasEnoughStock_InvalidStockFormat_ShouldReturnNotEnough() {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + "1";
        when(valueOps.get(key)).thenReturn("invalid");

        StockCheckResult result = stockRedisService.hasEnoughStock(1L, 5);

        assertEquals(StockCheckResult.NOT_ENOUGH, result);
    }
}