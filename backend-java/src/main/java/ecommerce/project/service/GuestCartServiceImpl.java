package ecommerce.project.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import ecommerce.project.dtorequest.CartItemRequest;
import ecommerce.project.entity.CartEntity;
import ecommerce.project.entity.CartEntity.CartStatus;
import ecommerce.project.entity.CartItemEntity;
import ecommerce.project.repository.CartItemRepository;
import ecommerce.project.repository.CartRepository;
import ecommerce.project.repository.ProductRepository;
import ecommerce.project.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
public class GuestCartServiceImpl implements GuestCartService {

    private static final String PREFIX = "guest_cart:";
    private static final long TTL = 1; // 1 ngày

    private final RedisTemplate<String, Object> guestCartRedisTemplate;
    private final ObjectMapper objectMapper;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public GuestCartServiceImpl(
            @Qualifier("guestCartRedisTemplate") RedisTemplate<String, Object> guestCartRedisTemplate,
            ObjectMapper redisObjectMapper,
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.guestCartRedisTemplate = guestCartRedisTemplate;
        this.objectMapper = redisObjectMapper;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void saveGuestCartToRedis(String uuid, List<CartItemRequest> items) {
        String key = PREFIX + uuid;
        guestCartRedisTemplate.opsForValue().set(key, items, TTL, TimeUnit.DAYS);
        log.info("✅ Guest cart [{}] saved to Redis with {} items", uuid, items.size());
    }

    @Override
    public List<CartItemRequest> getGuestCart(String uuid) {
        String key = PREFIX + uuid;
        Object data = guestCartRedisTemplate.opsForValue().get(key);

        if (data instanceof List<?> list && !list.isEmpty() && list.get(0) instanceof LinkedHashMap) {
            return list.stream()
                    .map(item -> objectMapper.convertValue(item, CartItemRequest.class))
                    .collect(Collectors.toList());
        }

        return (List<CartItemRequest>) data;
    }

    @Override
    public void clearGuestCart(String uuid) {
        String key = PREFIX + uuid;
        guestCartRedisTemplate.delete(key);
        log.info("🗑️ Guest cart [{}] removed from Redis", uuid);
    }

    @Override
    @Transactional
    public void syncGuestCartsToMySQL() {
        try {
            // Sử dụng RedisTemplate.keys thay vì connection low-level
            var keys = guestCartRedisTemplate.keys(PREFIX + "*");

            if (keys == null || keys.isEmpty()) {
                log.info("🔍 Không có guest cart nào trong Redis để đồng bộ.");
                return;
            }

            for (String key : keys) {
                String uuid = key.replace(PREFIX, "");

                List<CartItemRequest> items = getGuestCart(uuid);
                if (items == null || items.isEmpty()) continue;

                // Nếu chưa có cart thì mới sync
                if (cartRepository.findByUuidToken(uuid).isEmpty()) {
                    CartEntity cart = new CartEntity();

                    cart.setUuidToken(uuid);
                    cart.setStatus(CartStatus.GUEST);
                    cart.setExpiredAt(LocalDateTime.now().plusDays(1));
                    CartEntity savedCart = cartRepository.save(cart);

                    int addedItems = 0;
                    for (CartItemRequest req : items) {
                        if (req.getProductId() == null || req.getQuantity() <= 0) {
                            log.warn("⛔ Bỏ qua item có productId null hoặc quantity <= 0 trong cart {}", uuid);
                            continue;
                        }

                        productRepository.findById(req.getProductId()).ifPresent(product -> {
                            BigDecimal unitPrice = product.getNewPrice();

                            CartItemEntity cartItem = new CartItemEntity();
                            cartItem.setCart(savedCart);
                            cartItem.setProductId(req.getProductId());
                            cartItem.setQuantity(req.getQuantity());
                            cartItem.setUnitPrice(unitPrice);
                            cartItem.setCreatedAt(LocalDateTime.now());

                            cartItemRepository.save(cartItem);
                        });

                        addedItems++;
                    }

                    if (addedItems == 0) {
                        cartRepository.delete(savedCart);
                        log.warn("🗑️ Cart [{}] không có item hợp lệ, đã bị xóa.", uuid);
                    } else {
                        guestCartRedisTemplate.delete(key); // ✅ Xóa sau khi lưu thành công
                        log.info("✅ Synced guest cart [{}] with {} items to MySQL", uuid, addedItems);
                    }
                } else {
                    log.debug("ℹ️ Cart [{}] already exists in MySQL, skipping sync", uuid);
                }
            }
        } catch (Exception e) {
            log.error("❌ Error syncing guest carts to MySQL: {}", e.getMessage(), e);
        }
    }
}