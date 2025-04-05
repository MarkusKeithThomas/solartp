package ecommerce.project.service;

import ecommerce.project.entity.ProductEntity;
import ecommerce.project.exception.StockException;
import ecommerce.project.repository.ProductRepository;
import ecommerce.project.utils.RedisKeyPrefix;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockRedisServiceImpl implements StockRedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ProductRepository productRepository;

    // ✅ Lua Script – atomic check & decrement
    private static final String DECREMENT_STOCK_SCRIPT =
            "local stock = redis.call('GET', KEYS[1])\n" +
                    "if stock and tonumber(stock) >= tonumber(ARGV[1]) then\n" +
                    "    return redis.call('DECRBY', KEYS[1], ARGV[1])\n" +
                    "else\n" +
                    "    return -1\n" +
                    "end";

    @Override
    public int hasEnoughStock(Long productId, int quantity) {
        if (productId <= 0 || quantity <= 0) {
            throw new StockException("Kiểm tra lại giá trị productId và quantity ");
        }
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + productId;
        String stockStr = redisTemplate.opsForValue().get(key);
        if (stockStr == null) return 0;

        try {
            int currentStock = Integer.parseInt(stockStr);
            return currentStock;
        } catch (NumberFormatException e) {
            return -1;
        }
    }
    /**
     * ✅ Trừ tồn kho nếu còn đủ. Atomic check với Lua.
     */
    @Override
    public boolean decrementStock(Long productId, int quantity) {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + productId;

        DefaultRedisScript<Long> script = new DefaultRedisScript<>();
        script.setScriptText(DECREMENT_STOCK_SCRIPT);
        script.setResultType(Long.class);

        Long result = redisTemplate.execute(
                script,
                List.of(key),
                String.valueOf(quantity)
        );

        return result != null && result >= 0;
    }

    /**
     * ✅ Khôi phục tồn kho khi đơn bị huỷ.
     */
    @Override
    public void restoreStock(Long productId, int quantity) {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + productId;
        redisTemplate.opsForValue().increment(key, quantity);
    }

    /**
     * ✅ Load stock từ DB vào Redis khi khởi động.
     */
    @Override
    public void preloadStockFromDatabase() {
        List<ProductEntity> products = productRepository.findAll();
        for (ProductEntity product : products) {
            String key = RedisKeyPrefix.STOCK_KEY_PREFIX + product.getId();
            redisTemplate.opsForValue().setIfAbsent(key, String.valueOf(product.getStockQuantity()));
        }
    }

    /**
     * ✅ Xoá stock Redis nếu sản phẩm bị xoá khỏi DB.
     */
    @Override
    public void deleteStockKey(Long productId) {
        redisTemplate.delete(RedisKeyPrefix.STOCK_KEY_PREFIX + productId);
    }
}