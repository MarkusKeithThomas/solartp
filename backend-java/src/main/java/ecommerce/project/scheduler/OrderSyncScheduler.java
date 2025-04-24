package ecommerce.project.scheduler;

import ecommerce.project.service.StockRedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class OrderSyncScheduler {

    private final StockRedisService stockRedisService;

    /**
     * Đồng bộ tồn kho từ Redis về MySQL mỗi 30 phút
     */
    @Scheduled(fixedRate = 30 * 60 * 1000) // 30 phút
    public void syncStockFromRedisToDatabase() {
        try {
            stockRedisService.syncStockToDatabase();
            log.info("✅ Đã đồng bộ tồn kho từ Redis về MySQL thành công");
        } catch (Exception e) {
            log.error("❌ Lỗi khi đồng bộ tồn kho từ Redis về MySQL", e);
        }
    }
}