package ecommerce.project.service;

import ecommerce.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ProductViewSyncService {
    @Qualifier("redisTemplate") // Hoặc bạn có thể chỉ rõ là RedisTemplate<String, Object>
    private final RedisTemplate<String, Object> redisTemplate;

    private final ProductRepository productRepository;

    private static final String VIEW_KEY_PREFIX = "product_views_count:";

    public ProductViewSyncService(RedisTemplate<String,Object> redisTemplate, ProductRepository productRepository){
        this.redisTemplate = redisTemplate;
        this.productRepository = productRepository;

    }


    @Scheduled(cron = "0 0 3 * * *") // Mỗi ngày lúc 03:00 sáng
    public void syncViewCounts() {
        System.out.println("🔁 Đang đồng bộ lượt xem vào MySQL...");

        Set<String> keys = redisTemplate.keys(VIEW_KEY_PREFIX + "*");
        if (keys == null || keys.isEmpty()) {
            System.out.println("ℹ️ Không có lượt xem nào để đồng bộ.");
            return;
        }

        for (String key : keys) {
            try {
                String productIdStr = key.replace(VIEW_KEY_PREFIX, "");
                Long productId = Long.valueOf(productIdStr);

                Object viewObj = redisTemplate.opsForValue().get(key);
                Long views = 0L;

                if (viewObj instanceof Number) {
                    views = ((Number) viewObj).longValue();
                } else if (viewObj instanceof String) {
                    views = Long.parseLong((String) viewObj);
                }

                if (views > 0) {
                    productRepository.incrementCountView(productId, views);
                    redisTemplate.delete(key); // ✅ Xóa Redis sau khi sync
                    System.out.println("✔ Đã cập nhật sản phẩm ID " + productId + " với " + views + " lượt xem");
                }
            } catch (Exception e) {
                System.err.println("❌ Lỗi xử lý key: " + key + " – " + e.getMessage());
            }
        }

        System.out.println("✅ Hoàn tất đồng bộ view vào MySQL.");
    }
}