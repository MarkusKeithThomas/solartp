package ecommerce.project.scheduler;

import ecommerce.project.service.GuestCartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class GuestCartSyncScheduler {

    private final GuestCartService guestCartService;

    /**
     * Chạy mỗi 30 phút để sync giỏ hàng guest từ Redis về MySQL
     */
    @Scheduled(cron = "0 */15 * * * *") // chạy mỗi 30 phút
    public void syncGuestCarts() {
        log.info("🔄 [Scheduler] Bắt đầu đồng bộ giỏ hàng guest từ Redis về MySQL...");
        guestCartService.syncGuestCartsToMySQL();
        log.info("✅ [Scheduler] Hoàn tất đồng bộ giỏ hàng guest.");
    }
}