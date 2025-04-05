package ecommerce.project.event;

import ecommerce.project.service.StockRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StockPreloadListener implements ApplicationListener<ContextRefreshedEvent> {

    private final StockRedisService stockRedisService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        stockRedisService.preloadStockFromDatabase();
        System.out.println("✅ Stock đã preload vào Redis. StockPreloadListener");
    }
}
