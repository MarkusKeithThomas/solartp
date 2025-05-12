package ecommerce.project.scheduler;

import ecommerce.project.service.ProductRedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ProductSyncScheduler {

    private final ProductRedisService productRedisService;

    private static final int MAX_RETRIES = 3;

    @Scheduled(cron = "0 */5 * * * *") // chạy mỗi 5 phút
    public void syncGuestCarts() {
        log.info("🔄 [Scheduler] Bắt đầu đồng bộ toàn bộ sản phẩm từ MySQL lên Redis... key product_map");

        int attempt = 0;
        boolean success = false;

        while (attempt < MAX_RETRIES && !success) {
            try {
                attempt++;
                productRedisService.syncAllActiveProductsToRedis();
                success = true;
                log.info("✅ [Scheduler] Đồng bộ sản phẩm thành công ở lần thử thứ {}", attempt);
            } catch (Exception e) {
                log.error("❌ [Scheduler] Lỗi khi đồng bộ sản phẩm ở lần thử thứ {}: {}", attempt, e.getMessage());
                if (attempt >= MAX_RETRIES) {
                    log.error("💥 [Scheduler] Đồng bộ thất bại sau {} lần thử. Bỏ qua.", MAX_RETRIES);
                } else {
                    try {
                        Thread.sleep(2000); // ngủ 2 giây trước khi retry tiếp
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        log.error("⚡ [Scheduler] Bị gián đoạn khi đợi retry", ie);
                        break;
                    }
                }
            }
        }
    }
}
