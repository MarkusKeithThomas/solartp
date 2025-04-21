package ecommerce.project.scheduler;

import ecommerce.project.service.ProductRedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@RequiredArgsConstructor
public class ProductSyncScheduler{


        private final ProductRedisService productRedisService;

        /**
         * Chạy mỗi 15 phút để sync giỏ hàng guest từ Redis về MySQL
         */
        @Scheduled(cron = "0 */5 * * * *") // chạy mỗi 5 phút
        public void syncGuestCarts() {
            log.info("🔄 [Scheduler] Bắt đầu đồng bộ toan bo san pham tu mysql len redis...");
            productRedisService.syncAllActiveProductsToRedis();
            log.info("✅ [Scheduler] Hoàn tất đồng bộ giỏ toan bo san pham.");
        }

}
