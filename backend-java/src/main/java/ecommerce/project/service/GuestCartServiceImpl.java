package ecommerce.project.service;

import ecommerce.project.dto.CartItemDTO;
import ecommerce.project.dtorequest.CartItemRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class GuestCartServiceImpl implements GuestCartService {

    private final RedisTemplate<String, List<CartItemRequest>> guestCartRedisTemplate;

    private static final String PREFIX = "guest_cart:";
    private static final long TTL = 2;

    @Override
    public void saveGuestCart(String uuid, List<CartItemRequest> cartItemRequests) {
        String redisKey = PREFIX + uuid;
        guestCartRedisTemplate.opsForValue().set(redisKey, cartItemRequests, TTL, TimeUnit.DAYS);
    }

    @Override
    public List<CartItemDTO> getGuestCart(String uuid) {
        String redisKey = PREFIX + uuid;
        List<CartItemRequest> requests = guestCartRedisTemplate.opsForValue().get(redisKey);

        return requests.stream()
                .map(req -> {
                    CartItemDTO dto = new CartItemDTO();
                    dto.setProductId(req.getProductId());
                    dto.setQuantity(req.getQuantity());
                    return dto;
                }).toList();
    }

    @Override
    public void clearGuestCart(String uuid) {
        guestCartRedisTemplate.delete(PREFIX + uuid);
    }
}