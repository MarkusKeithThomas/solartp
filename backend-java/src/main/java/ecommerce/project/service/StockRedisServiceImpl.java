package ecommerce.project.service;

import ecommerce.project.entity.ProductEntity;
import ecommerce.project.exception.StockException;
import ecommerce.project.model.ProductStockRedis;
import ecommerce.project.model.StockCheckResult;
import ecommerce.project.repository.ProductRepository;
import ecommerce.project.utils.RedisKeyPrefix;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Service
public class StockRedisServiceImpl implements StockRedisService {

    @Value("${value.test}")
    private String value;

    @Qualifier("stockRedisTemplate")
    private final RedisTemplate<String, String> redisTemplate;

    private final ProductRepository productRepository;

    // 🔹 Lua Script – Kiểm tra và trừ 1 sản phẩm (đang dùng cũ)
    private static final String SINGLE_DECREMENT_LUA = """
        local stock = redis.call('GET', KEYS[1])
        if stock and tonumber(stock) >= tonumber(ARGV[1]) then
            return redis.call('DECRBY', KEYS[1], ARGV[1])
        else
            return -1
        end
    """;

    // 🔸 Lua Script – Trừ nhiều sản phẩm hoặc hủy tất cả nếu thiếu
    private static final String MULTI_DECREMENT_LUA = """
        for i = 1, #KEYS do
          local stock = tonumber(redis.call('GET', KEYS[i]))
          local qty = tonumber(ARGV[i])
          if not stock or stock < qty then
            return -1
          end
        end
        for i = 1, #KEYS do
          redis.call('DECRBY', KEYS[i], ARGV[i])
        end
        return 1
    """;

    public StockRedisServiceImpl(@Qualifier("stockRedisTemplate") RedisTemplate<String, String> redisTemplate, ProductRepository productRepository) {
        this.redisTemplate = redisTemplate;
        this.productRepository = productRepository;
    }

    @Override
    public StockCheckResult hasEnoughStock(Long productId, int quantity) {
        if (productId <= 0 || quantity <= 0) {
            throw new StockException("Kiểm tra lại giá trị productId và quantity ");
        }
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + productId;
        try {
            String stockStr = redisTemplate.opsForValue().get(key);
            if(stockStr == null){
                log.warn("⚠️ Không tìm thấy key trong Redis: {}", key);
                return productRepository.findById(productId)
                        .map(p -> {
                            int stock = p.getStockQuantity();
                            redisTemplate.opsForValue().set(key,String.valueOf(stock), Duration.ofHours(1));
                            log.info("📦 Thực hiện lưu key lên redis sau khi tìm ở mysql với số lượng {} va productId {}",stock,productId);
                            return (stock >= quantity) ? StockCheckResult.ENOUGH : StockCheckResult.NOT_ENOUGH;
                        })
                        .orElse(StockCheckResult.NOT_ENOUGH);
            }
            int stock = Integer.parseInt(stockStr);
            log.info("📦 Kiểm tra tồn kho productId={}, quantity={}, stockInRedis={}", productId, quantity, stock);
            return (stock >= quantity) ? StockCheckResult.ENOUGH : StockCheckResult.NOT_ENOUGH;

        } catch (NumberFormatException e){
            log.error("❗ Stock Redis không hợp lệ: {}", e.getMessage());
            return StockCheckResult.NOT_ENOUGH;
        } catch (RedisConnectionFailureException e){
            log.warn("❌ Redis lỗi, fallback check DB.");
            return productRepository.findById(productId)
                    .filter(p -> p.getStockQuantity() >= quantity)
                    .map(p -> StockCheckResult.ENOUGH)
                    .orElse(StockCheckResult.NOT_ENOUGH);
        }
    }

    @Override
    public long decrementStock(Long productId, int quantity) {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + productId;

        DefaultRedisScript<Long> script = new DefaultRedisScript<>();
        script.setScriptText(SINGLE_DECREMENT_LUA);
        script.setResultType(Long.class);

        Long result = redisTemplate.execute(script, List.of(key), String.valueOf(quantity));
        return result != null ? result : -1;
    }

    /**
     * ✅ Trừ nhiều sản phẩm một lúc – nếu 1 sản phẩm không đủ thì không trừ cái nào
     */
    @Override
    public boolean decrementMultiProduct(List<Long> productIds, List<Integer> quantities) {
        if (productIds.size() != quantities.size()) {
            throw new IllegalArgumentException("Số lượng productId và quantity không khớp");
        }

        List<String> keys = productIds.stream()
                .map(id -> RedisKeyPrefix.STOCK_KEY_PREFIX + id)
                .toList();

        List<String> args = quantities.stream()
                .map(String::valueOf)
                .toList();

        DefaultRedisScript<Long> script = new DefaultRedisScript<>();
        script.setScriptText(MULTI_DECREMENT_LUA);
        script.setResultType(Long.class);

        Long result = redisTemplate.execute(script, keys, args.toArray());
        return result == 1;
    }

    @Override
    public void restoreStock(Long productId, int quantity) {
        String key = RedisKeyPrefix.STOCK_KEY_PREFIX + productId;
        redisTemplate.opsForValue().increment(key, quantity);
        log.info("✅ Stock đã restoreStock vào Redis: {} sản phẩm", key);

    }

    @Override
    public void preloadStockFromDatabase() {
        List<ProductStockRedis> productList = productRepository.findAllProductStockOnly();
        long start = System.currentTimeMillis();
        log.info("📦 Kiểm tra gia tri straging preloadStockFromDatabase" + value);


        redisTemplate.executePipelined((RedisCallback<Object>) connection -> {
            for (ProductStockRedis product : productList) {
                String key = RedisKeyPrefix.STOCK_KEY_PREFIX + product.getId();
                String value = String.valueOf(product.getStockQuantity());
                connection.stringCommands().set(
                        key.getBytes(StandardCharsets.UTF_8),
                        value.getBytes(StandardCharsets.UTF_8)
                );
            }

            return null;
        });

        long duration = System.currentTimeMillis() - start;
        log.info("🚀 Preload {} sản phẩm lên Redis mất {} ms (pipeline)", productList.size(), duration);
    }

    @Override
    public void syncStockRedisToDatabase() {
        List<ProductEntity> allProducts = productRepository.findAll();
        int updatedCount = 0;
        for (ProductEntity product : allProducts) {
            String key = RedisKeyPrefix.STOCK_KEY_PREFIX + product.getId();
            String quantityStr = redisTemplate.opsForValue().get(key);
            if(quantityStr == null) {
                log.warn("❗Không tìm thấy Redis key cho product ID {}", product.getId());
                continue;
            }
                try {
                    int redisQuantity = Integer.parseInt(quantityStr);
                    if (product.getStockQuantity() != redisQuantity) {
                        product.setStockQuantity(redisQuantity);
                        productRepository.save(product);
                        updatedCount++;
                    }
                } catch (NumberFormatException e) {
                    log.error("Giá trị Redis không hợp lệ cho product ID {}: {}", product.getId(), quantityStr);
                }
        }
        log.info("✅ Đồng bộ stock từ Redis về DB thành công. Đã cập nhật {} sản phẩm.", updatedCount);
    }

    @Override
    public void deleteStockKey(Long productId) {
        log.info("✅ Stock đã deleteStockKey tu Redis: {} sản phẩm co productId", productId );
        redisTemplate.delete(RedisKeyPrefix.STOCK_KEY_PREFIX + productId);

    }
}