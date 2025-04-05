package ecommerce.project.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ProductViewServiceImpl implements ProductViewService {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String VIEW_KEY_PREFIX = "product_views_count:";
    private static final String IP_KEY_PREFIX = "product_view_ip:";

    @Override
    public void incrementViewIfAllowed(Long productId, String ipAddress) {
        String ipKey = IP_KEY_PREFIX + productId + ":" + ipAddress;

        if (Boolean.TRUE.equals(redisTemplate.hasKey(ipKey))) return;

        String viewKey = VIEW_KEY_PREFIX + productId;
        redisTemplate.opsForValue().increment(viewKey);
        redisTemplate.opsForValue().set(ipKey, "1", 5, TimeUnit.MINUTES);
    }

    @Override
    public long getViewCount(Long productId) {
        String viewKey = VIEW_KEY_PREFIX + productId;
        Object val = redisTemplate.opsForValue().get(viewKey);
        return val != null ? Long.parseLong(val.toString()) : 0;
    }
}
