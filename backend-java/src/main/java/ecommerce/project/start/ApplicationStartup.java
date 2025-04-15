package ecommerce.project.start;

import ecommerce.project.service.ProductRedisService;
import ecommerce.project.utils.RedisKeyPrefix;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
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
