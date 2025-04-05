package ecommerce.project.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import ecommerce.project.dtorequest.CartItemRequest;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class GuestCartServiceImpl implements GuestCartService {

    private static final String PREFIX = "guest_cart:";
    private static final long TTL = 1; // 1 ngày

    private final RedisTemplate<String, Object> guestCartRedisTemplate;

    public GuestCartServiceImpl(@Qualifier("guestCartRedisTemplate") RedisTemplate<String, Object> guestCartRedisTemplate) {
        this.guestCartRedisTemplate = guestCartRedisTemplate;
    }

    @Override
    public void saveGuestCart(String uuid, List<CartItemRequest> items) {
        String key = PREFIX + uuid;
        guestCartRedisTemplate.opsForValue().set(key, items, TTL, TimeUnit.DAYS);
    }

    @Override
    public List<CartItemRequest> getGuestCart(String uuid) {
        String key = PREFIX + uuid;
        Object data = guestCartRedisTemplate.opsForValue().get(key);
        if (data instanceof List<?> list && !list.isEmpty() && list.get(0) instanceof LinkedHashMap) {
            ObjectMapper mapper = new ObjectMapper();
            return list.stream().map(obj -> mapper.convertValue(obj, CartItemRequest.class)).toList();
        }
        return (List<CartItemRequest>) data;
    }

    @Override
    public void clearGuestCart(String uuid) {
        guestCartRedisTemplate.delete(PREFIX + uuid);
    }
}