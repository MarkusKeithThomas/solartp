package ecommerce.project.start;

import ecommerce.project.service.ProductRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApplicationStartup implements CommandLineRunner {

    private final ProductRedisService productRedisService;

    @Override
    public void run(String... args) {
        System.out.println("🚀 App Startup: Sync Redis Cache");
        productRedisService.syncAllActiveProductsToRedis();
    }
}
