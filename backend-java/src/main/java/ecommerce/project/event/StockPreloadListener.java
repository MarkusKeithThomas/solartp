package ecommerce.project.event;

import ecommerce.project.service.StockRedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class StockPreloadListener implements ApplicationListener<ContextRefreshedEvent> {

    private final StockRedisService stockRedisService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        stockRedisService.preloadStockFromDatabase();
        log.info("✅ Stock đã preload vào Redis. StockPreloadListener");
    }
}
